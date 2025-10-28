import { Appointment } from "../models/indexModel.js";

// Devuelve resumen de ganancias:
// - totalToday: suma de precios de citas completadas del día (00:00 - 23:59 local)
// - totalWeek: suma de precios de las últimas 7 días (incluye hoy)
// - totalAll: suma de precios de todas las citas completadas
// - dailyLast7Days: array con objeto { date: 'YYYY-MM-DD', total }
// Suposición: sólo las citas con status === 'completed' cuentan como ingresos.
export const getEarningsSummary = async () => {
  try {
    const now = new Date();

    // inicio del día (00:00:00.000) y fin del día (23:59:59.999) en hora local
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000 - 1);

    // inicio de los últimos 7 días (incluye hoy). Por ejemplo, si hoy es día 7,
    // se toman días 1..7 -> last 7 calendar days
    const days = 7;
    const startOfWeekWindow = new Date(startOfToday.getTime() - (days - 1) * 24 * 60 * 60 * 1000);

    // totalAll
    const totalAllAgg = await Appointment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$price", 0] } } } },
    ]);
    const totalAll = totalAllAgg[0]?.total || 0;

    // totalToday
    const totalTodayAgg = await Appointment.aggregate([
      { $match: { status: "completed", date: { $gte: startOfToday, $lte: endOfToday } } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$price", 0] } } } },
    ]);
    const totalToday = totalTodayAgg[0]?.total || 0;

    // totalWeek (últimos 7 días incluyendo hoy)
    const totalWeekAgg = await Appointment.aggregate([
      { $match: { status: "completed", date: { $gte: startOfWeekWindow, $lte: endOfToday } } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$price", 0] } } } },
    ]);
    const totalWeek = totalWeekAgg[0]?.total || 0;

    // Serie diaria para los últimos 7 días (formato YYYY-MM-DD)
    const dailyAgg = await Appointment.aggregate([
      { $match: { status: "completed", date: { $gte: startOfWeekWindow, $lte: endOfToday } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          total: { $sum: { $ifNull: ["$price", 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Mapear resultados a un diccionario para completar días faltantes con 0
    const dailyMap = {};
    dailyAgg.forEach((d) => {
      dailyMap[d._id] = d.total;
    });

    const dailyLast7Days = [];
    for (let i = 0; i < days; i++) {
      const day = new Date(startOfWeekWindow.getTime() + i * 24 * 60 * 60 * 1000);
      const y = day.getFullYear();
      const m = String(day.getMonth() + 1).padStart(2, "0");
      const dd = String(day.getDate()).padStart(2, "0");
      const key = `${y}-${m}-${dd}`;
      dailyLast7Days.push({ date: key, total: dailyMap[key] || 0 });
    }

    return {
      totalToday,
      totalWeek,
      totalAll,
      dailyLast7Days,
    };
  } catch (error) {
    throw new Error("Error obteniendo métricas del dashboard: " + error.message);
  }
};

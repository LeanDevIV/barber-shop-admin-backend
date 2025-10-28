import { Appointment } from "../models/indexModel.js";

export const createAppointment = async (data) => {
  try {
    const appointment = new Appointment(data);
    return await appointment.save();
  } catch (error) {
    throw new Error("Error creando cita: " + error.message);
  }
};

export const getAllAppointments = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    return await Appointment.find()
      .populate("service", "name description price duration")
      .exec()
      .limit(limit)
      .skip(skip);
  } catch (error) {
    throw new Error("Error obteniendo citas: " + error.message);
  }
};

export const getAppointmentById = async (id) => {
  try {
    return await Appointment.findById(id)
      .populate("service", "name description price duration")
      .exec();
  } catch (error) {
    throw new Error("Error obteniendo cita: " + error.message);
  }
};
// Filtros por fecha, estado, servicio
export const getAppointmentsByDate = async (startDate, endDate) => {
  return await Appointment.find({
    date: { $gte: startDate, $lte: endDate },
  }).populate("service");
};

export const updateAppointment = async (id, data) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("service", "name description price duration");

    if (!appointment) {
      throw new Error("Cita no encontrada");
    }

    return appointment;
  } catch (error) {
    throw new Error("Error actualizando cita: " + error.message);
  }
};

export const deleteAppointment = async (id) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      throw new Error("Cita no encontrada");
    }

    return { message: "Cita eliminada exitosamente" };
  } catch (error) {
    throw new Error("Error eliminando cita: " + error.message);
  }
};

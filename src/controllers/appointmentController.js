import * as appointmentService from "../services/appointmentService.js";

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
    res.status(200).json(appointment);
  } catch (error) {
    if (error.message.includes("no encontrada")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const result = await appointmentService.deleteAppointment(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes("no encontrada")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

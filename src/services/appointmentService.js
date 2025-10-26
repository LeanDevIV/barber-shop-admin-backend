import { Appointment } from "../models/indexModel.js"

export const createAppointment = async (data) => {
  try {
    const appointment = new Appointment(data);
    return await appointment.save();
  } catch (error) {
    throw new Error("Error creando cita: " + error.message);
  }
};

export const getAllAppointments = async () => {
  try {
    return await Appointment.find()
      .populate('service', 'name description price duration')
      .exec();
  } catch (error) {
    throw new Error("Error obteniendo citas: " + error.message);
  }
};

export const getAppointmentById = async (id) => {
  try {
    return await Appointment.findById(id)
      .populate('service', 'name description price duration')
      .exec();
  } catch (error) {
    throw new Error("Error obteniendo cita: " + error.message);
  }
};

import { Service } from "../models/indexModel.js";

export const createService = async (data) => {
	try {
		const service = new Service(data);
		return await service.save();
	} catch (error) {
		throw new Error("Error creando servicio: " + error.message);
	}
};

export const getAllServices = async (page = 1, limit = 50) => {
	try {
		const skip = (page - 1) * limit;
		return await Service.find()
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip(skip)
			.exec();
	} catch (error) {
		throw new Error("Error obteniendo servicios: " + error.message);
	}
};

export const getServiceById = async (id) => {
	try {
		return await Service.findById(id).exec();
	} catch (error) {
		throw new Error("Error obteniendo servicio: " + error.message);
	}
};

export const updateService = async (id, data) => {
	try {
		const service = await Service.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		}).exec();

		if (!service) throw new Error("Servicio no encontrado");

		return service;
	} catch (error) {
		throw new Error("Error actualizando servicio: " + error.message);
	}
};

export const deleteService = async (id) => {
	try {
		const service = await Service.findByIdAndDelete(id).exec();

		if (!service) throw new Error("Servicio no encontrado");

		return { message: "Servicio eliminado exitosamente" };
	} catch (error) {
		throw new Error("Error eliminando servicio: " + error.message);
	}
};

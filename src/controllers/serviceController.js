import * as serviceService from "../services/serviceService.js";

export const createService = async (req, res, next) => {
	try {
		const { name, price } = req.body;

		if (!name || price === undefined) {
			return res.status(400).json({ message: "Nombre y precio son requeridos" });
		}

		const service = await serviceService.createService(req.body);
		res.status(201).json(service);
	} catch (error) {
		next(error);
	}
};

export const getAllServices = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 50;
		const services = await serviceService.getAllServices(page, limit);
		res.status(200).json(services);
	} catch (error) {
		next(error);
	}
};

export const getServiceById = async (req, res, next) => {
	try {
		const service = await serviceService.getServiceById(req.params.id);
		if (!service) return res.status(404).json({ message: "Servicio no encontrado" });
		res.status(200).json(service);
	} catch (error) {
		next(error);
	}
};

export const updateService = async (req, res, next) => {
	try {
		const updated = await serviceService.updateService(req.params.id, req.body);
		res.status(200).json(updated);
	} catch (error) {
		if (error.message.includes("no encontrado")) {
			return res.status(404).json({ message: error.message });
		}
		next(error);
	}
};

export const deleteService = async (req, res, next) => {
	try {
		const result = await serviceService.deleteService(req.params.id);
		res.status(200).json(result);
	} catch (error) {
		if (error.message.includes("no encontrado")) {
			return res.status(404).json({ message: error.message });
		}
		next(error);
	}
};

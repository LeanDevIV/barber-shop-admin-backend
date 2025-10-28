import * as dashboardService from "../services/dashboardService.js";

export const getDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getEarningsSummary();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

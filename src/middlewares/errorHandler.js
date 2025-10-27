/**
 * Middleware para manejo de errores
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

  // Si el error tiene un código de estado, usarlo; de lo contrario, 500
  const statusCode = err.statusCode || 500;

  // Mensaje de error
  const message = statusCode === 500 ? "Error interno del servidor" : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

/**
 * Middleware para manejar rutas no encontradas (404)
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Ruta no encontrada: ${req.originalUrl}`,
    },
  });
};


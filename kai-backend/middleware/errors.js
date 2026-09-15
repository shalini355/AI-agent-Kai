export class AppError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    error: "NotFound",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(error, req, res, _next) {
  const statusCode = error.statusCode || 500;
  const message = statusCode >= 500 ? "An unexpected server error occurred." : error.message;

  req.log?.error({ err: error, statusCode }, "Request failed");

  res.status(statusCode).json({
    error: error.name || "InternalServerError",
    message,
    ...(error.details ? { details: error.details } : {}),
  });
}

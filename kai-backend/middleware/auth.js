import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { AppError } from "./errors.js";

export function requireAuth(req, _res, next) {
  const header = req.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token || !env.JWT_SECRET) {
    return next(new AppError(401, "Authentication is required."));
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
    return next();
  } catch (_error) {
    return next(new AppError(401, "Authentication token is invalid or expired."));
  }
}

export function optionalAuth(req, _res, next) {
  const header = req.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token || !env.JWT_SECRET) return next();

  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
  } catch (_error) {
    req.user = null;
  }

  return next();
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError(403, "You do not have permission to access this resource."));
    }
    return next();
  };
}

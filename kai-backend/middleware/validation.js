import { AppError } from "./errors.js";

export function validateBody(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new AppError(400, "Request body is invalid.", result.error.flatten().fieldErrors));
    }

    req.body = result.data;
    return next();
  };
}

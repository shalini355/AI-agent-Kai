import { loginUser, registerUser } from "../services/authService.js";

export async function register(req, res) {
  const result = await registerUser(req.body.email, req.body.password);
  res.status(201).json(result);
}

export async function login(req, res) {
  const result = await loginUser(req.body.email, req.body.password);
  res.json(result);
}

export function me(req, res) {
  res.json({
    user: {
      id: req.user.sub,
      email: req.user.email,
      role: req.user.role,
    },
  });
}

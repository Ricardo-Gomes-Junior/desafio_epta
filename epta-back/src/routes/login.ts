// src/routes/login.ts
import { Router } from "express";
import { login } from "../controllers/loginController";

const router = Router();

router.post("/login", login);

export default router;

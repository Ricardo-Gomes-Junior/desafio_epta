import { Router } from "express";
import {
  registerUser,
  listUsers,
  deleteUser,
} from "../controllers/userController";

const router = Router();

router.post("/registerUser", registerUser);
router.get("/listUsers", listUsers);
router.delete("/deleteUser/:id", deleteUser);

export default router;

import express from "express";
import {
  registerVehicle,
  listVehicles,
  editVehicle,
  archiveVehicle,
  unarchiveVehicle,
  deleteVehicle,
  vehiclesDashboard,
} from "../controllers/vehicleController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/registerVehicle", authMiddleware, registerVehicle);
router.get("/listVehicles", authMiddleware, listVehicles);
router.put("/editVehicle/:id", authMiddleware, editVehicle);
router.patch("/archiveVehicle/:id", authMiddleware, archiveVehicle);
router.patch("/unarchiveVehicle/:id", authMiddleware, unarchiveVehicle);
router.delete("/deleteVehicle/:id", authMiddleware, deleteVehicle);
router.get("/vehiclesDashboard", authMiddleware, vehiclesDashboard);

export default router;

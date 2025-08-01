import express from "express";
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getStatByJenis,
  getStatByStatus,
  getStatByLokasi,
} from "../controllers/kendaraan.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { validateVehicle } from "../middleware/validateVehicle.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/statistik/jenis", verifyToken, getStatByJenis);
router.get("/statistik/status", verifyToken, getStatByStatus);
router.get("/statistik/lokasi", verifyToken, getStatByLokasi);

router.get("/", verifyToken, getVehicles);
router.get("/:id", verifyToken, getVehicleById);

router.post("/", verifyToken, verifyRole(["admin"]), upload.single("foto"), validateVehicle, createVehicle);
router.put("/:id", verifyToken, verifyRole(["admin"]), validateVehicle, updateVehicle);
router.delete("/:id", verifyToken, verifyRole(["admin"]), deleteVehicle);

export default router;

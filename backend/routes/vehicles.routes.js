import express from "express";
import {
  getAllVehicles,
  getStatistikJenis,
  getStatistikLokasi,
  getStatistikTahun,
  getStatistikStatus,
  createKendaraan,
} from "../controllers/kendaraan.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { validateVehicle } from "../middleware/validateVehicle.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/statistik/jenis", verifyToken, getStatistikJenis);
router.get("/statistik/status", verifyToken, getStatistikStatus);
router.get("/statistik/lokasi", verifyToken, getStatistikLokasi);
router.get("/statistik/tahun", verifyToken, getStatistikTahun);
router.get("/vehicles/today-out", verifyToken, getTodayOutVehicles);

router.get("/", verifyToken, getAllVehicles);
router.post("/", verifyToken, verifyRole(["admin"]), upload.single("foto"), validateVehicle, createKendaraan);

router.get("/admin-only", verifyToken, verifyRole(["admin"]), (req, res) => {
  res.send("Halaman hanya untuk admin");
});
router.get("/input-kendaraan", verifyToken, verifyRole(["admin", "staff"]), (req, res) => {
  res.send("Halaman input kendaraan");
});

export default router;

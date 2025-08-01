import { verifyToken, requireRole } from "../middleware/auth.js";

router.get(
  "/admin-only",
  verifyToken,
  requireRole("admin"),
  (req, res) => {
    res.send("Halaman hanya untuk admin");
  }
);

router.get(
  "/input-kendaraan",
  verifyToken,
  requireRole(["admin", "staff"]),
  (req, res) => {
    res.send("Halaman input kendaraan");
  }
);

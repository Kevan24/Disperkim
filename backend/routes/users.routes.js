import express from "express";
import {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.get("/", verifyToken, verifyRole(["admin"]), getAllUsers);
router.post("/", verifyToken, verifyRole(["admin"]), validateUser, registerUser);
router.put("/:id", verifyToken, verifyRole(["admin"]), validateUser, updateUser);
router.delete("/:id", verifyToken, verifyRole(["admin"]), deleteUser);

export default router;

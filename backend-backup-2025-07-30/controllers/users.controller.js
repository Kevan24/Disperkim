import db from "../config/database.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, username, role FROM users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data pengguna", error });
  }
};

export const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    const [existing] = await db.query("SELECT id FROM users WHERE username = ?", [username]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Username sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role]
    );

    res.status(201).json({ message: "User berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan user", error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: "Username dan role wajib diisi" });
  }

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?",
        [username, hashedPassword, role, id]
      );
    } else {
      await db.query(
        "UPDATE users SET username = ?, role = ? WHERE id = ?",
        [username, role, id]
      );
    }

    res.json({ message: "User berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui user", error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus user", error });
  }
};

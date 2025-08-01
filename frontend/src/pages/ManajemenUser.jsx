import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ManajemenUser = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Gagal fetch users:", error);
      alert("Gagal memuat data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateUser = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username wajib diisi";
    if (!isEditing && form.password.length < 4) {
      newErrors.password = "Password minimal 4 karakter";
    }
    if (!form.role) newErrors.role = "Role harus dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUser()) return;

    try {
      if (isEditing) {
        await axios.put(`/api/users/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("User berhasil diperbarui.");
      } else {
        await axios.post("/api/users", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("User berhasil ditambahkan.");
      }

      setForm({ username: "", password: "", role: "user" });
      setIsEditing(false);
      setEditId(null);
      setErrors({});
      fetchUsers();
    } catch (error) {
      console.error("Error saat submit:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleEdit = (user) => {
    setForm({ username: user.username, password: "", role: user.role });
    setIsEditing(true);
    setEditId(user.id);
    setErrors({});
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("User berhasil dihapus.");
        fetchUsers();
      } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Gagal menghapus user.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Manajemen User</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 max-w-md"
      >
        <h2 className="text-xl font-semibold mb-2">{isEditing ? "Edit User" : "Tambah User"}</h2>

        <div className="mb-2">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 rounded border"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div className="mb-2">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={
              isEditing ? "(Kosongkan jika tidak ingin ubah password)" : "Password"
            }
            className="w-full px-3 py-2 rounded border"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="mb-2">
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update" : "Tambah"}
        </button>
      </form>

      {loading ? (
        <p className="text-center">Memuat data pengguna...</p>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-300 dark:border-gray-600">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManajemenUser;

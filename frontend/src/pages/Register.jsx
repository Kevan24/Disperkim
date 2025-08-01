import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/register", form);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">Register</h2>
        <input className="input" type="text" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input className="input mt-2" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <select className="input mt-2" onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn mt-4 w-full">Register</button>
      </form>
    </div>
  );
}

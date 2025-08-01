import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AuthContext } from "../context/AuthContext";

const StatistikTahun = () => {
  const [dataTahun, setDataTahun] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/kendaraan/statistik/tahun`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDataTahun(res.data))
      .catch((err) =>
        console.error("Gagal mengambil statistik berdasarkan tahun:", err)
      );
  }, [token]);

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Statistik Kendaraan Berdasarkan Tahun Dibuat</h1>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={dataTahun}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tahun" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#facc15" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatistikTahun;

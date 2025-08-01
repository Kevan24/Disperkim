import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AuthContext } from "../context/AuthContext";

const StatistikLokasi = () => {
  const [dataLokasi, setDataLokasi] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/kendaraan/statistik/lokasi`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDataLokasi(res.data))
      .catch((err) =>
        console.error("Gagal mengambil statistik berdasarkan lokasi:", err)
      );
  }, [token]);

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Statistik Kendaraan Berdasarkan Lokasi</h1>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dataLokasi}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="lokasi" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#34d399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatistikLokasi;

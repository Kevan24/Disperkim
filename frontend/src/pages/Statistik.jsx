import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer as PieContainer,
} from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as BarTooltip,
  ResponsiveContainer as BarContainer,
} from "recharts";
import { AuthContext } from "../context/AuthContext";

const Statistik = () => {
  const { token } = useContext(AuthContext);
  const [dataJenis, setDataJenis] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loadingJenis, setLoadingJenis] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    // Statistik jenis kendaraan
    axios
      .get(`${import.meta.env.VITE_API_URL}/kendaraan/statistik/jenis`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const formatted = res.data.map((item) => ({
          name: item.jenis,
          value: item.total,
        }));
        setDataJenis(formatted);
      })
      .catch((err) => {
        console.error("Gagal memuat data jenis kendaraan:", err);
      })
      .finally(() => {
        setLoadingJenis(false);
      });

    // Statistik status kendaraan
    axios
      .get(`${import.meta.env.VITE_API_URL}/vehicles/status-stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStatusData(res.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil statistik status kendaraan:", err);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }, [token]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Statistik Kendaraan</h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2">Berdasarkan Jenis</h2>
        {loadingJenis ? (
          <p className="text-gray-500 dark:text-gray-300">Memuat data...</p>
        ) : dataJenis.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">Tidak ada data.</p>
        ) : (
          <PieContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataJenis}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {dataJenis.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip />
            </PieChart>
          </PieContainer>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Berdasarkan Status</h2>
        {loadingStatus ? (
          <p className="text-gray-500 dark:text-gray-300">Memuat data...</p>
        ) : statusData.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">Tidak ada data.</p>
        ) : (
          <BarContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="status" stroke="#8884d8" />
              <YAxis />
              <BarTooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </BarContainer>
        )}
      </div>
    </div>
  );
};

export default Statistik;

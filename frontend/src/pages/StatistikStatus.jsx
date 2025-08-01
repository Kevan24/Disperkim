import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatistikStatus = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/vehicles/statistik/status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  }, []);

  const chartData = {
    labels: data.map((item) => item.status),
    datasets: [
      {
        label: "Jumlah Kendaraan",
        data: data.map((item) => item.total),
        backgroundColor: ["#22c55e", "#facc15", "#ef4444", "#3b82f6", "#a855f7"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Statistik Status Kendaraan</h2>
      {data.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Memuat data...</p>
      )}
    </div>
  );
};

export default StatistikStatus;

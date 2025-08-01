import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { AuthContext } from "../context/AuthContext";

const StatistikJenis = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vehicles/statistik/jenis", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Gagal mengambil data statistik jenis kendaraan:", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Statistik Jenis Kendaraan
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jenis" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatistikJenis;

import React, { useEffect, useState } from 'react';
import { statistikService } from '../services/statistikService';
import { Bar } from 'react-chartjs-2';
import NotifikasiKendaraan from '../components/NotifikasiKendaraan';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    servicesThisMonth: 0,
    byJenis: [],
    byStatus: [],
    byLokasi: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [overview, jenis, status, lokasi] = await Promise.all([
          statistikService.getStats(),
          statistikService.getByJenis(),
          statistikService.getByStatus(),
          statistikService.getByLokasi(),
        ]);

        setStats({
          totalVehicles: overview?.totalVehicles || 0,
          servicesThisMonth: overview?.servicesThisMonth || 0,
          byJenis: jenis || [],
          byStatus: status || [],
          byLokasi: lokasi || [],
        });
      } catch (error) {
        console.error("Gagal mengambil statistik:", error);
      }
    };

    fetchStats();
  }, []);

  const buildChartData = (data, labelKey) => ({
    labels: data.map(item => item[labelKey]),
    datasets: [
      {
        label: 'Jumlah',
        data: data.map(item => item.total),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 6,
      },
    ],
  });

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Statistik</h1>

      <div className="mb-6">
        <NotifikasiKendaraan />
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Jumlah Kendaraan</h2>
          <p className="text-3xl mt-2 text-sky-600">{stats.totalVehicles}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Servis Bulan Ini</h2>
          <p className="text-3xl mt-2 text-sky-600">{stats.servicesThisMonth}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Statistik Jenis</h3>
          <Bar data={buildChartData(stats.byJenis, 'jenis')} options={{ responsive: true }} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Statistik Status</h3>
          <Bar data={buildChartData(stats.byStatus, 'status')} options={{ responsive: true }} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Statistik Lokasi</h3>
          <Bar data={buildChartData(stats.byLokasi, 'lokasi')} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

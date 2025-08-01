import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotifikasiKendaraan = () => {
  const [notifikasi, setNotifikasi] = useState([]);

  useEffect(() => {
    const fetchNotifikasi = async () => {
      try {
        const res = await axios.get('/api/vehicles/today-out', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNotifikasi(res.data);
      } catch (err) {
        console.error('Gagal mengambil notifikasi', err);
      }
    };
    fetchNotifikasi();
  }, []);

  return (
    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md mb-4">
      <h2 className="font-bold text-lg mb-2">🚨 Notifikasi Hari Ini</h2>
      {notifikasi.length === 0 ? (
        <p>Tidak ada kendaraan keluar hari ini.</p>
      ) : (
        <ul className="list-disc ml-5">
          {notifikasi.map((item) => (
            <li key={item.id}>
              Kendaraan {item.jenis_kendaraan} dengan merek <strong>{item.merek}</strong> keluar hari ini.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotifikasiKendaraan;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const res = await axios.get('/api/audit-log'); // endpoint dari backend
      setLogs(res.data);
    } catch (error) {
      console.error('Gagal mengambil log audit:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Riwayat Perubahan Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 border">Tanggal</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Aksi</th>
              <th className="px-4 py-2 border">Data Lama</th>
              <th className="px-4 py-2 border">Data Baru</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-2 border">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2 border">{log.username}</td>
                <td className="px-4 py-2 border">{log.action}</td>
                <td className="px-4 py-2 border">{log.old_data}</td>
                <td className="px-4 py-2 border">{log.new_data}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  Tidak ada riwayat perubahan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLog;

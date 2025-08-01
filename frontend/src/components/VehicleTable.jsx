import React from "react";

const VehicleTable = ({ vehicles }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Data Kendaraan</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Merek</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Tahun Dibuat</th>
              <th className="p-3 border">Tanggal Masuk</th>
              <th className="p-3 border">Tanggal Keluar</th>
              <th className="p-3 border">Penanggung Jawab</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Lokasi</th>
              <th className="p-3 border">Catatan</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, index) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border">{v.merek}</td>
                <td className="p-3 border text-center">{v.jumlah}</td>
                <td className="p-3 border text-center">{v.tahun_dibuat}</td>
                <td className="p-3 border">{v.tanggal_masuk}</td>
                <td className="p-3 border">{v.tanggal_keluar}</td>
                <td className="p-3 border">{v.penanggung_jawab}</td>
                <td className="p-3 border">{v.status}</td>
                <td className="p-3 border">{v.lokasi}</td>
                <td className="p-3 border">{v.catatan}</td>
                <td className="p-3 border space-x-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;
import React, { useEffect, useState } from "react";
import axios from "axios";

const Kendaraan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/kendaraan")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
      });
  }, []);

  return (
    <div>
      <h1>Data Kendaraan</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Merk</th>
            <th>Jenis</th>
            <th>Tahun</th>
          </tr>
        </thead>
        <tbody>
          {data.map((kendaraan) => (
            <tr key={kendaraan.id}>
              <td>{kendaraan.id}</td>
              <td>{kendaraan.merk}</td>
              <td>{kendaraan.jenis}</td>
              <td>{kendaraan.tahun}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Kendaraan;

import React, { useEffect, useState } from "react";
import { getAllKendaraan } from "../services/kendaraan.service";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getAllKendaraan();
    setData(result);
  };

  const exportToPDF = (data) => {
    const doc = new jsPDF();
    doc.text("Data Kendaraan Dinas Disperkim", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [
        ["Jenis", "Merek", "Masuk", "Keluar", "PJ", "Tahun", "Status", "Lokasi", "Catatan"],
      ],
      body: data.map((item) => [
        item.jenis,
        item.merek,
        item.tanggal_masuk,
        item.tanggal_keluar || "-",
        item.penanggung_jawab,
        item.tahun_dibuat,
        item.status,
        item.lokasi,
        item.catatan,
      ]),
      styles: { fontSize: 8 },
    });
    doc.save("data_kendaraan_disperkim.pdf");
  };

  const exportToExcel = (data) => {
    const worksheetData = data.map((item) => ({
      Jenis: item.jenis,
      Merek: item.merek,
      "Tanggal Masuk": item.tanggal_masuk,
      "Tanggal Keluar": item.tanggal_keluar || "-",
      "Penanggung Jawab": item.penanggung_jawab,
      "Tahun Dibuat": item.tahun_dibuat,
      Status: item.status,
      Lokasi: item.lokasi,
      Catatan: item.catatan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kendaraan");

    XLSX.writeFile(workbook, "data_kendaraan_disperkim.xlsx");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/add");
  };

  return (
    <div>
      <h2>Daftar Kendaraan</h2>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => exportToPDF(data)}>Export ke PDF</button>
        <button onClick={() => exportToExcel(data)} style={{ marginLeft: "10px" }}>
          Export ke Excel
        </button>
        <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
          Tambah Data
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Jenis</th>
            <th>Merek</th>
            <th>Masuk</th>
            <th>Keluar</th>
            <th>Penanggung Jawab</th>
            <th>Tahun</th>
            <th>Status</th>
            <th>Lokasi</th>
            <th>Catatan</th>
            <th>Foto</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.jenis}</td>
              <td>{item.merek}</td>
              <td>{item.tanggal_masuk}</td>
              <td>{item.tanggal_keluar || "-"}</td>
              <td>{item.penanggung_jawab}</td>
              <td>{item.tahun_dibuat}</td>
              <td>{item.status}</td>
              <td>{item.lokasi}</td>
              <td>{item.catatan}</td>
              <td>
                {item.foto ? (
                  <img src={`http://localhost:5000/uploads/${item.foto}`} width="100" alt="foto" />
                ) : (
                  "Tidak ada"
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

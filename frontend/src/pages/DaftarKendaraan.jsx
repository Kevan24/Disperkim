import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DaftarKendaraan = () => {
  const [kendaraan, setKendaraan] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [lokasiFilter, setLokasiFilter] = useState("");
  const [tahunFilter, setTahunFilter] = useState("");

  useEffect(() => {
    fetchKendaraan();
  }, []);

  const fetchKendaraan = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/kendaraan");
      setKendaraan(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.error("Gagal mengambil data kendaraan:", error);
    }
  };

  useEffect(() => {
    filterKendaraan();
  }, [searchTerm, statusFilter, lokasiFilter, tahunFilter]);

  const filterKendaraan = () => {
    let data = kendaraan;

    if (searchTerm) {
      data = data.filter((item) =>
        item.merek.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((item) => item.status === statusFilter);
    }

    if (lokasiFilter) {
      data = data.filter((item) => item.lokasi === lokasiFilter);
    }

    if (tahunFilter) {
      data = data.filter(
        (item) => item.tahun_dibuat === parseInt(tahunFilter)
      );
    }

    setFilteredData(data);
  };

  const uniqueValues = (key) => [
    ...new Set(kendaraan.map((item) => item[key]).filter(Boolean)),
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Data Kendaraan", 14, 10);

    const tableColumn = ["Merek", "Status", "Lokasi", "Tahun"];
    const tableRows = filteredData.map((item) => [
      item.merek,
      item.status,
      item.lokasi,
      item.tahun_dibuat,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("data-kendaraan.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kendaraan");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(file, "data-kendaraan.xlsx");
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setStatusFilter("");
    setLokasiFilter("");
    setTahunFilter("");
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Daftar Kendaraan</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Input
          placeholder="Cari berdasarkan merek..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select onValueChange={setStatusFilter} value={statusFilter}>
          <SelectItem value="">Semua Status</SelectItem>
          {uniqueValues("status").map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>

        <Select onValueChange={setLokasiFilter} value={lokasiFilter}>
          <SelectItem value="">Semua Lokasi</SelectItem>
          {uniqueValues("lokasi").map((lokasi) => (
            <SelectItem key={lokasi} value={lokasi}>
              {lokasi}
            </SelectItem>
          ))}
        </Select>

        <Select onValueChange={setTahunFilter} value={tahunFilter}>
          <SelectItem value="">Semua Tahun</SelectItem>
          {uniqueValues("tahun_dibuat").map((tahun) => (
            <SelectItem key={tahun} value={tahun}>
              {tahun}
            </SelectItem>
          ))}
        </Select>

        <button
          onClick={handleResetFilter}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-4 py-2 text-sm"
        >
          Reset Filter
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleExportPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
        <button
          onClick={handleExportExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-1">
              <p>
                <strong>Merek:</strong> {item.merek}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <p>
                <strong>Lokasi:</strong> {item.lokasi}
              </p>
              <p>
                <strong>Tahun:</strong> {item.tahun_dibuat}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DaftarKendaraan;

import jsPDF from "jspdf";
import "jspdf-autotable";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";


const exportToPDF = (data) => {
  const doc = new jsPDF();

  doc.text("Data Kendaraan Dinas Disperkim", 14, 10);
  doc.autoTable({
    startY: 20,
    head: [
      [
        "Jenis",
        "Merek",
        "Masuk",
        "Keluar",
        "PJ",
        "Tahun",
        "Status",
        "Lokasi",
        "Catatan",
      ],
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

import db from "../models/db.js";

export const getAllVehicles = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM kendaraan");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kendaraan", error });
  }
};

export const createKendaraan = async (req, res) => {
  const {
    nama,
    jenis,
    merek,
    tanggal_masuk,
    tanggal_keluar,
    penanggung_jawab,
    tahun_dibuat,
    catatan,
    status,
    lokasi,
  } = req.body;

  const errors = {};
  if (!nama) errors.nama = "Nama kendaraan wajib diisi.";
  if (!jenis) errors.jenis = "Jenis kendaraan tidak boleh kosong.";
  if (!merek) errors.merek = "Merek kendaraan harus diisi.";
  if (!tanggal_masuk) errors.tanggal_masuk = "Tanggal masuk harus valid.";
  if (!tanggal_keluar) errors.tanggal_keluar = "Tanggal keluar tidak boleh kosong.";
  if (!penanggung_jawab) errors.penanggung_jawab = "Penanggung jawab wajib diisi.";
  if (!tahun_dibuat || isNaN(tahun_dibuat)) errors.tahun_dibuat = "Tahun harus berupa angka.";
  if (!status) errors.status = "Status kendaraan harus dipilih.";
  if (!lokasi) errors.lokasi = "Lokasi kendaraan tidak boleh kosong.";
  if (!catatan) errors.catatan = "Catatan tidak boleh kosong.";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const foto = req.file?.filename || null;

  const sql = `
    INSERT INTO kendaraan 
    (nama, jenis, merek, tanggal_masuk, tanggal_keluar, penanggung_jawab, tahun_dibuat, catatan, status, lokasi, foto) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(sql, [
      nama,
      jenis,
      merek,
      tanggal_masuk,
      tanggal_keluar,
      penanggung_jawab,
      tahun_dibuat,
      catatan,
      status,
      lokasi,
      foto,
    ]);
    res.status(201).json({ message: "Kendaraan berhasil ditambahkan", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan kendaraan", error });
  }
};

export const getStatistikLokasi = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT lokasi, COUNT(*) AS total 
      FROM kendaraan 
      GROUP BY lokasi
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil statistik lokasi", error });
  }
};

export const getStatistikTahun = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT tahun_dibuat AS tahun, COUNT(*) AS total 
      FROM kendaraan 
      GROUP BY tahun_dibuat 
      ORDER BY tahun_dibuat
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil statistik tahun dibuat", error });
  }
};

export const getStatistikJenis = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT jenis, COUNT(*) AS total 
      FROM kendaraan 
      GROUP BY jenis
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil statistik jenis kendaraan", error });
  }
};

export const getStatistikStatus = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT status, COUNT(*) AS total 
      FROM kendaraan 
      GROUP BY status
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil statistik status kendaraan", error });
  }
};

export const getTodayOutVehicles = (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const q = `
    SELECT * FROM kendaraan
    WHERE tanggal_keluar = ? AND status = 'keluar'
  `;
  db.query(q, [today], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

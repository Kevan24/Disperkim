import db from "../models/db.js";

export const createKendaraan = (req, res) => {
  const {
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

  const foto = req.file?.filename;

  const sql = `
    INSERT INTO kendaraan 
    (jenis, merek, tanggal_masuk, tanggal_keluar, penanggung_jawab, tahun_dibuat, catatan, status, lokasi, foto) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [jenis, merek, tanggal_masuk, tanggal_keluar, penanggung_jawab, tahun_dibuat, catatan, status, lokasi, foto],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Kendaraan added", id: result.insertId });
    }
  );
};

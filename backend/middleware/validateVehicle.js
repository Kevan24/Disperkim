export const validateVehicle = (req, res, next) => {
  const {
    nama_kendaraan,
    jumlah,
    merk,
    tahun_dibuat,
    tanggal_masuk,
    status,
    lokasi,
    penanggung_jawab,
  } = req.body;

  if (!nama_kendaraan || !jumlah || !merk || !tahun_dibuat || !tanggal_masuk || !status || !lokasi || !penanggung_jawab) {
    return res.status(400).json({ message: "Semua field kendaraan wajib diisi." });
  }

  if (isNaN(jumlah) || isNaN(tahun_dibuat)) {
    return res.status(400).json({ message: "Jumlah dan Tahun Dibuat harus berupa angka." });
  }

  next();
};

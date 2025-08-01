import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormKendaraan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nama: "",
    jenis: "",
    merek: "",
    tanggal_masuk: "",
    tanggal_keluar: "",
    penanggung_jawab: "",
    tahun_dibuat: "",
    status: "",
    lokasi: "",
    catatan: "",
    foto: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      axios.get(`${import.meta.env.VITE_API_URL}/kendaraan/${id}`)
        .then(res => setFormData(res.data))
        .catch(() => toast.error("Gagal memuat data kendaraan"));
    }
  }, [id]);

  const validate = () => {
    const err = {};
    if (!formData.nama) err.nama = "Nama kendaraan wajib diisi";
    if (!formData.jenis) err.jenis = "Jenis kendaraan tidak boleh kosong";
    if (!formData.merek) err.merek = "Merek kendaraan harus diisi";
    if (!formData.tanggal_masuk) err.tanggal_masuk = "Tanggal masuk harus valid";
    if (!formData.tanggal_keluar) err.tanggal_keluar = "Tanggal keluar tidak boleh kosong";
    if (!formData.penanggung_jawab) err.penanggung_jawab = "Penanggung jawab wajib diisi";
    if (!formData.tahun_dibuat || isNaN(formData.tahun_dibuat))
      err.tahun_dibuat = "Tahun dibuat harus berupa angka";
    if (!formData.status) err.status = "Status kendaraan harus dipilih";
    if (!formData.lokasi) err.lokasi = "Lokasi kendaraan tidak boleh kosong";
    if (!formData.catatan) err.catatan = "Catatan tidak boleh kosong";
    if (!formData.foto && !isEditMode) err.foto = "Foto kendaraan wajib diunggah";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      if (isEditMode) {
        await axios.put(`${import.meta.env.VITE_API_URL}/kendaraan/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Data kendaraan berhasil diperbarui");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/kendaraan`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Kendaraan berhasil ditambahkan");
      }

      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Terjadi kesalahan saat menyimpan data.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 shadow rounded">
      {[
        { name: "nama", label: "Nama Kendaraan" },
        { name: "jenis", label: "Jenis Kendaraan" },
        { name: "merek", label: "Merek" },
        { name: "tanggal_masuk", label: "Tanggal Masuk", type: "date" },
        { name: "tanggal_keluar", label: "Tanggal Keluar", type: "date" },
        { name: "penanggung_jawab", label: "Penanggung Jawab" },
        { name: "tahun_dibuat", label: "Tahun Dibuat", type: "number" },
        { name: "lokasi", label: "Lokasi" },
      ].map(({ name, label, type = "text" }) => (
        <div key={name}>
          <label className="block font-medium">{label}</label>
          <input
            type={type}
            value={formData[name] || ""}
            onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
            className="input-style w-full"
          />
          {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
        </div>
      ))}

      <div>
        <label className="block font-medium">Status Kendaraan</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="input-style w-full"
        >
          <option value="">Pilih Status</option>
          <option value="aktif">Aktif</option>
          <option value="keluar">Keluar</option>
          <option value="rusak">Rusak</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
      </div>

      <div>
        <label className="block font-medium">Catatan</label>
        <textarea
          value={formData.catatan}
          onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
          className="input-style w-full"
        />
        {errors.catatan && <p className="text-red-500 text-sm">{errors.catatan}</p>}
      </div>

      <div>
        <label className="block font-medium">Upload Foto Kendaraan</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, foto: e.target.files[0] })}
          className="input-style w-full"
        />
        {errors.foto && <p className="text-red-500 text-sm">{errors.foto}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        {isEditMode ? "Perbarui" : "Simpan"}
      </button>
    </form>
  );
};

export default FormKendaraan;

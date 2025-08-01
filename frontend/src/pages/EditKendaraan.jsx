import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getKendaraanById, updateKendaraan } from "src/services/kendaraanService";

const EditKendaraan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    jenis: "",
    merek: "",
    tanggal_masuk: "",
    tanggal_keluar: "",
    penanggung_jawab: "",
    tahun_dibuat: "",
    catatan: "",
    status: "",
    lokasi: "",
  });

  useEffect(() => {
    getKendaraanById(id).then(setForm);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateKendaraan(id, form);
    alert("Data berhasil diupdate!");
    navigate("/");
  };

  return (
    <div className="p-4">
      <h2>Edit Kendaraan</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label>{key.replace("_", " ")}: </label>
            <input
              type={key.includes("tanggal") ? "date" : "text"}
              name={key}
              value={form[key] ?? ""}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditKendaraan;

import axios from "axios";

const API_URL = "http://localhost:5000/api/kendaraan";

// Ambil semua data kendaraan
export const getAllKendaraan = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data kendaraan:", error);
    return [];
  }
};

// Tambah kendaraan baru
export const addKendaraan = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan kendaraan:", error);
    throw error;
  }
};

// Ambil data kendaraan berdasarkan ID
export const getKendaraanById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil kendaraan dengan ID ${id}:`, error);
    return null;
  }
};

// Update data kendaraan
export const updateKendaraan = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Gagal mengupdate kendaraan dengan ID ${id}:`, error);
    throw error;
  }
};

// Hapus kendaraan
export const deleteKendaraan = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal menghapus kendaraan dengan ID ${id}:`, error);
    throw error;
  }
};

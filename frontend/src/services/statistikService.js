import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const statistikService = {
  getStats: async () => {
    const res = await axios.get(`${API_URL}/kendaraan/statistik`);
    return res.data;
  },

  getByJenis: async () => {
    const res = await axios.get(`${API_URL}/kendaraan/statistik/jenis`);
    return res.data;
  },

  getByStatus: async () => {
    const res = await axios.get(`${API_URL}/kendaraan/statistik/status`);
    return res.data;
  },

  getByLokasi: async () => {
    const res = await axios.get(`${API_URL}/kendaraan/statistik/lokasi`);
    return res.data;
  },
};

import React, { useState } from 'react';
import { KendaraanService } from '../services/KendaraanService';

const AddKendaraan = () => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    await KendaraanService.uploadPhoto(formData);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tambah Kendaraan</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Foto Kendaraan
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-600 file:text-white hover:file:bg-sky-700"
          />
        </div>
        {preview && <img src={preview} alt="Preview" className="mt-4 max-w-xs rounded-lg" />}
        <button
          type="submit"
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors"
        >
          Unggah
        </button>
      </form>
    </div>
  );
};

export default AddKendaraan;
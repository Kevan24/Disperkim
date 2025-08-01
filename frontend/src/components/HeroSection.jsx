import React from "react";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Selamat Datang di Disperkim
      </h1>
      <p className="text-lg text-gray-700 max-w-xl">
        Aplikasi untuk memantau dan mengelola data kendaraan operasional
        milik Dinas Perumahan dan Kawasan Permukiman.
      </p>
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition duration-300">
          Mulai Sekarang
        </button>
      </div>
    </section>
  );
}

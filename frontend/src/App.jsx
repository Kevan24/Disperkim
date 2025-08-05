import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginTemp";
import Dashboard from "./pages/Dashboard";
import ManajemenUser from "./pages/ManajemenUser";
import Unauthorized from "./pages/Unauthorized";
import StatistikStatus from "./pages/StatistikStatus";
import StatistikJenis from "./pages/StatistikJenis";
import StatistikLokasi from "./pages/StatistikLokasi";
import StatistikTahun from "./pages/StatistikTahun";
import DaftarKendaraan from "./pages/DaftarKendaraan";
import FormKendaraan from "./pages/FormKendaraan";
import AuditLog from "./pages/AuditLog";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="dark">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manajemen-user"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ManajemenUser />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/statistik/jenis"
          element={
            <ProtectedRoute>
              <StatistikJenis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistik/lokasi"
          element={
            <ProtectedRoute>
              <StatistikLokasi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistik/tahun"
          element={
            <ProtectedRoute>
              <StatistikTahun />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistik/status"
          element={
            <ProtectedRoute>
              <StatistikStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kendaraan"
          element={
            <ProtectedRoute>
              <DaftarKendaraan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form-kendaraan"
          element={
            <ProtectedRoute>
              <FormKendaraan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form-kendaraan/:id"
          element={
            <ProtectedRoute>
              <FormKendaraan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/audit-log"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AuditLog />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;

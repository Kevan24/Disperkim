import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            Disperkim
          </Link>
          <div className="flex flex-col md:flex-row gap-2">
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Dashboard
            </Link>
            <Link
              to="/statistik/jenis"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Statistik Jenis
            </Link>
            <Link
              to="/statistik/lokasi"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Statistik Lokasi
            </Link>
            <Link
              to="/statistik/tahun"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Statistik Tahun
            </Link>
            <Link
              to="/statistik/status"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Statistik Status
            </Link>
            {user?.role === "admin" && (
              <>
                <Link
                  to="/manajemen-user"
                  className="text-gray-700 dark:text-gray-300 hover:underline"
                >
                  Manajemen User
                </Link>
                <Link
                  to="/audit-log"
                  className="text-gray-700 dark:text-gray-300 hover:underline"
                >
                  Audit Log
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-200">
            {user?.username}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

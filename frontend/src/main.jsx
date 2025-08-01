import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import AuthProvider from "./context/AuthContext";
import router from "./routes/index.jsx";
import Chart from "chart.js/auto";
import { RouterProvider } from "react-router-dom";

import HeroSection from "./components/HeroSection";

function InitChart() {
  useEffect(() => {
    const canvas = document.getElementById("servisChart");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb"],
          datasets: [
            {
              label: "Servis",
              data: [10, 20],
              backgroundColor: "#38bdf8",
            },
          ],
        },
      });
    }
  }, []);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <InitChart />
      <RouterProvider router={router} />
      <HeroSection />
    </AuthProvider>
  </React.StrictMode>
);

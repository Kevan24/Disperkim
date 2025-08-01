import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import router from "@/routes";

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
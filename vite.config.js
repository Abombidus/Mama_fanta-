import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteQRCode } from "vite-qr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteQRCode()],
  server: {
    host: true, // Set to true to listen on all addresses, including LAN and public IPs
    port: 5173, // Specify the port you want to use
  },
});

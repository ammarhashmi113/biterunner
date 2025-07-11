import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        host: true,
        allowedHosts: [
            "620a-2407-d000-f-ed3-8551-9c77-5ddc-7afd.ngrok-free.app",
        ],
    },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({

    plugins: [react()],

    resolve: {

        alias: {

            "@": path.resolve(__dirname, "./src"),

            "@app": path.resolve(__dirname, "./src/app"),

            "@assets": path.resolve(__dirname, "./src/assets"),

            "@shared": path.resolve(__dirname, "./src/shared"),

            "@features": path.resolve(__dirname, "./src/features")

        }

    },

    server: {

        port: 5173,

        open: true,

        proxy: {

            "/api": {

                target: "http://localhost:4000",

                changeOrigin: true

            }

        }

    }

});
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tailwindcss(),
        reactRouter(),
        tsconfigPaths()
    ],
    server: {
        host: true,
        port: 5173,
        open: true,
        watch: {
            usePolling: true,
            interval: 100,
        },
        fs: {
            allow: ['.']
        },
        middlewareMode: false,
    },
    build: {
        rollupOptions: {
            external: ['.well-known/appspecific/com.chrome.devtools.json']
        }
    },
    optimizeDeps: {
        include: ['@supabase/supabase-js']
    },
});

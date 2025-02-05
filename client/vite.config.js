import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { PORT } from './config';

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: PORT,
    },
    plugins: [react(), tailwindcss()],
});

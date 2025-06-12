import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = process.env.VITE_PORT || 80;

export default defineConfig({
    server: {
        port: PORT,
    },
    plugins: [react()],
});

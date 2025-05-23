import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
const PORT = process.env.VITE_PORT || 80;

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: PORT,
    },
    plugins: [
        react(),
        tailwindcss({
            content: [
                './src/**/*.jsx', // Your project files
                './components/**/*.jsx', // Example for your components
                './index.html', // Often needed
            ],
        }),
    ],
});

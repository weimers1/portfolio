import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import './css/main.css';
import App from './App.jsx';
import ParticleBackground from './components/ParticleBackground';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ParticleBackground />
            <div className="z-1 relative">
                <App />
            </div>
        </BrowserRouter>
    </StrictMode>
);

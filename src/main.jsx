import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './styles/global.css';
import './components/Loader.css';
import './components/Navbar.css';
import './components/Cursor.css';
import './components/SoundToggle.css';
import './components/ScrollProgress.css';
import './components/CinematicTransition.css';
import './components/Footer.css';
import './components/PageTransition.css';
import './sections/sections.css';
import './pages/pages.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

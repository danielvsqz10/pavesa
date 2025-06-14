import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Layout from './components/Layout';
// Importar los estilos CSS
import '../css/app.css';
import '../css/additional.css';
import '../css/additional-service-banner.css';
import ConcretoPage from './pages/ConcretoPage';
import AsfaltoPage from './pages/AsfaltoPage';
import TerraceriaPage from './pages/TerraceriaPage';
import BlogPage from './pages/BlogPage';
import BlogPageInterna from './pages/BlogPageInterna';
import ContactPage from './pages/ContactPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                </Route>
                <Route path="/concreto" element={<Layout />}>
                    <Route index element={<ConcretoPage />} />
                </Route>
                <Route path="/asfalto" element={<Layout />}>
                    <Route index element={<AsfaltoPage />} />
                </Route>
                <Route path="/terraceria" element={<Layout />}>
                    <Route index element={<TerraceriaPage />} />
                </Route>
                <Route path="/blog" element={<Layout />}>
                    <Route index element={<BlogPage />} />
                </Route>
                <Route path="/blog/:slug" element={<Layout />}>
                    <Route index element={<BlogPageInterna />} />
                </Route>
                <Route path="/contactenos" element={<Layout />}>
                    <Route index element={<ContactPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}

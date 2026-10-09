import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaCarrito from './pages/Carrito.jsx';

import { CarritoProvider } from './context/CarritoContext.jsx';
import Inicio from './pages/Inicio.jsx';
import { Catalogo } from './pages/Catalogo.jsx';
import LoginForm from './components/organisms/LoginForm.jsx';
import { productosData } from './data/productos.js';

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Inicio productos={productosData} />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/carrito" element={<PaginaCarrito />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
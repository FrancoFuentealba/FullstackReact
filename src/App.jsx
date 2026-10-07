
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import  Inicio  from './pages/Inicio.jsx';
import { Catalogo } from './pages/Catalogo.jsx';
import LoginForm from "./components/organisms/LoginForm.jsx";

const productos = [
  {codigo: "GTR-001", 
    categoria: "Guitarras",
        nombre: "Guitarra Eléctrica Stratocaster",
        marca: "Fender",
        modelo: "Player Strat",
        stock: 5,
        precio: 450000,
        imagen: "/img/guitarra.jpg"}
]

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Inicio productos={productos} />} />
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
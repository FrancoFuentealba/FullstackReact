
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Catalogo from './pages/catalogo';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginForm } from './components/organisms/LoginForm.jsx';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Inicio } from './pages/Inicio.jsx';
import { Catalogo } from './pages/Catalogo.jsx';
import { LoginForm } from './pages/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    </BrowserRouter>
  );
    <div className="app-container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        </div>
    </BrowserRouter>
}

export default App;
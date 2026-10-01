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
    <div className="app-container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        </div>
    </BrowserRouter>
    
  )
}

export default App;
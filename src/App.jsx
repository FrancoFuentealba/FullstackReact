
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Inicio } from './pages/Inicio.jsx';
import { Catalogo } from './pages/Catalogo.jsx';
import { LoginForm } from './components/organisms/LoginForm.jsx'; 

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          
          <Route path="/login" element={
            <div className="login-wrapper">
              <LoginForm />
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
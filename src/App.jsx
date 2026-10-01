<<<<<<< HEAD

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Catalogo from './pages/catalogo';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> d1100eb703d0a399d03a2a05c6b65a8716013eab
import { LoginForm } from './components/organisms/LoginForm.jsx';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Inicio } from './pages/Inicio.jsx';
import { Catalogo } from './pages/Catalogo.jsx';
<<<<<<< HEAD
import { LoginForm } from './pages/Login.jsx';
=======
>>>>>>> d1100eb703d0a399d03a2a05c6b65a8716013eab

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
<<<<<<< HEAD
  );
    <div className="app-container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        </div>
    </BrowserRouter>
=======
    
  )
>>>>>>> d1100eb703d0a399d03a2a05c6b65a8716013eab
}

export default App;
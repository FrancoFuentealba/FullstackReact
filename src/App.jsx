import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import Inicio from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import PaginaCarrito from './pages/Carrito';
import PaginaLogin from './pages/Login';

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<PaginaCarrito />} />
            <Route path="/login" element={<PaginaLogin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
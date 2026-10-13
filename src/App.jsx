import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import { ProductosProvider } from './context/ProductosContext';
import Inicio from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import PaginaCarrito from './pages/Carrito';
import PaginaLogin from './pages/Login';
import NoEncontrado from './pages/NoEncontrado';

function App() {
  return (
    <ProductosProvider>
      <CarritoProvider>
        <BrowserRouter>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/carrito" element={<PaginaCarrito />} />
              <Route path="/login" element={<PaginaLogin />} />
              <Route path="*" element={<NoEncontrado />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CarritoProvider>
    </ProductosProvider>
  );
}

export default App;
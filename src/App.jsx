import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import { ProductosProvider } from './context/ProductosContext';
import Inicio from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import PaginaCarrito from './pages/Carrito';
import PaginaLogin from './pages/Login';
import NoEncontrado from './pages/NoEncontrado';
import PaginaDetalleProducto from './pages/DetalleProducto';
import PaginaCategorias from './pages/Categorias';
import PaginaProductosCategoria from './pages/ProductosCategoria';
import PaginaOfertas from './pages/Ofertas';
import PaginaBuscar from './pages/Buscar';

function App() {
  return (
    <ProductosProvider>
      <CarritoProvider>
        <BrowserRouter>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/categorias" element={<PaginaCategorias />} />
              <Route path="/categorias/:nombre" element={<PaginaProductosCategoria />} />
              <Route path="/buscar" element={<PaginaBuscar />} />    
              <Route path="/ofertas" element={<PaginaOfertas />} />     
              <Route path="/producto/:id" element={<PaginaDetalleProducto />} />
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
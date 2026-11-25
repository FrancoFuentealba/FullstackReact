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
import { AuthProvider } from './context/AuthContext';
import { PedidosProvider } from './context/PedidosContext';
import PaginaRegistro from './pages/Registro';
import PaginaCheckout from './pages/Checkout';
import PaginaCompraExitosa from './pages/CompraExitosa';
import PaginaCompraFallida from './pages/CompraFallida';
import PaginaMisPedidos from './pages/MisPedidos';
import PaginaAdminProductos from './pages/AdminProductos';
import PaginaAdminPedidos from './pages/AdminPedidos';
import PaginaAdminInventario from './pages/AdminInventario';
import PaginaAdminUsuarios from './pages/AdminUsuarios';
import RutaProtegida from './components/templates/RutaProtegida';

function App() {
  return (
    <ProductosProvider>
      <CarritoProvider>
        <AuthProvider>
          <PedidosProvider>
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
                  <Route path="/checkout" element={<RutaProtegida><PaginaCheckout /></RutaProtegida>} />
                  <Route path="/compra-exitosa" element={<PaginaCompraExitosa />} />
                  <Route path="/compra-fallida" element={<PaginaCompraFallida />} />
                  <Route path="/carrito" element={<PaginaCarrito />} />
                  <Route path="/login" element={<PaginaLogin />} />
                  <Route path="/registro" element={<PaginaRegistro />} />
                  <Route path="/mis-pedidos" element={<RutaProtegida><PaginaMisPedidos /></RutaProtegida>} />
                  <Route path="/admin/productos" element={<RutaProtegida roles={['admin']}><PaginaAdminProductos /></RutaProtegida>} />
                  <Route path="/admin/usuarios" element={<RutaProtegida roles={['admin']}><PaginaAdminUsuarios /></RutaProtegida>} />
                  <Route path="/admin/inventario" element={<RutaProtegida roles={['admin', 'vendedor']}><PaginaAdminInventario /></RutaProtegida>} />
                  <Route path="/admin/pedidos" element={<RutaProtegida roles={['admin', 'vendedor']}><PaginaAdminPedidos /></RutaProtegida>} />
                  <Route path="*" element={<NoEncontrado />} />
                </Routes>
              </div>
            </BrowserRouter>
          </PedidosProvider>
        </AuthProvider>
      </CarritoProvider>
    </ProductosProvider>
  );
}

export default App;


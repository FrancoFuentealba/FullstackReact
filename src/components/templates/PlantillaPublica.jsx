import { useNavigate } from 'react-router-dom';
import NavbarAudioMax from '../organisms/NavbarAudioMax';
import Footer from '../organisms/Footer';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';

function PlantillaPublica(props) {
    const navigate = useNavigate();
    const { cantidadTotal } = useCarrito();
    const { usuario, cerrar } = useAuth();

    function buscar(texto) {
        navigate(`/buscar?q=${encodeURIComponent(texto)}`);
    }

    function cerrarSesion() {
        cerrar();
        navigate('/');
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarAudioMax
                onNavegar={navigate}
                onBuscar={buscar}
                cantidadCarrito={cantidadTotal}
                usuario={usuario}
                onCerrarSesion={cerrarSesion}
            />
            <main className="contenido flex-grow-1">{props.children}</main>
            <Footer />
        </div>
    );
}

export default PlantillaPublica;
import { useNavigate } from 'react-router-dom';
import NavbarAudioMax from '../organisms/NavbarAudioMax';
import Footer from '../organisms/Footer';
import { useCarrito } from '../../context/CarritoContext';

function PlantillaPublica(props) {
    const navigate = useNavigate();
    const { cantidadTotal } = useCarrito();

    function buscar(texto) {
        navigate(`/buscar?q=${encodeURIComponent(texto)}`);
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarAudioMax
                onNavegar={navigate}
                onBuscar={buscar}
                cantidadCarrito={cantidadTotal}
            />
            <main className="contenido flex-grow-1">{props.children}</main>
            <Footer />
        </div>
    );
}

export default PlantillaPublica;
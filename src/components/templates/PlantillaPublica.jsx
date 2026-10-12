import { useNavigate } from 'react-router-dom';
import NavbarAudioMax from '../organisms/NavbarAudioMax';
import Footer from '../organisms/Footer';
import { useCarrito } from '../../context/CarritoContext';

function PlantillaPublica(props) {
    const navigate = useNavigate();
    const { cantidadTotal } = useCarrito();

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarAudioMax onNavegar={navigate} cantidadCarrito={cantidadTotal} />
            <main className="contenido flex-grow-1">{props.children}</main>
            <Footer />
        </div>
    );
}

export default PlantillaPublica;


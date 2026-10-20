import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import Boton from '../components/atoms/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';

function NoEncontrado() {
    useTituloPagina('Pagina no encontrada')
    const navigate = useNavigate();

    return (
        <PlantillaPublica>
            <Container>
                <h2>Pagina no encontrada</h2>
                <p>La pagina que buscas no existe.</p>
                <Boton texto ="Volver al inicio" onClick={() => navigate('/')} />
            </Container>
        </PlantillaPublica>
    )
}

export default NoEncontrado;
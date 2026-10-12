
import Boton from '../atoms/Boton';

function HeroSection(props){
    return (
        <div className="hero-banner">
            <h1 className="hero-titulo">{props.titulo}</h1>
            <p className="hero-subtitulo">{props.subtitulo}</p>
            <Boton texto={props.textoBoton} className="hero-boton" onClick={props.onBoton} />
        </div>
    );
};

export default HeroSection;
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Guard de rutas. Sin `roles`: basta con tener sesión. Con `roles`: además el rol debe estar en la lista.
//  - sin sesión            → /login con aviso
//  - sesión sin permiso    → /login con aviso de falta de permiso
// (El backend vuelve a validar todo con 401/403; esto solo evita mostrar pantallas que no corresponden.)
function RutaProtegida({ roles, children }) {
    const { usuario } = useAuth();

    if (!usuario) {
        return <Navigate to="/login" replace state={{ aviso: 'Inicia sesión para entrar a esta página.' }} />;
    }

    if (roles && !roles.includes(usuario.rol)) {
        return <Navigate to="/login" replace state={{ aviso: 'No tienes permiso para entrar a esta página.' }} />;
    }

    return children;
}

export default RutaProtegida;

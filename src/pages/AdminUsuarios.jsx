import { useEffect, useState } from 'react';
import { Alert, Modal, Table } from 'react-bootstrap';
import PlantillaAdmin from '../components/templates/PlantillaAdmin';
import Boton from '../components/atoms/Boton';
import { useAuth } from '../context/AuthContext';
import { obtenerToken } from '../services/authService';
import * as usuarioService from '../services/usuarioService';
import { useTituloPagina } from '../hooks/useTituloPagina';

const ROLES = ['cliente', 'vendedor', 'admin'];

// CRUD de usuarios para el administrador: listar, editar (nombre, correo, rol) y desactivar/reactivar.
// Cada acción llama a /api/v1/usuarios con el JWT; la API vuelve a validar el rol.
function PaginaAdminUsuarios() {
    useTituloPagina('Admin · Usuarios');

    const { usuario: yo } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [aviso, setAviso] = useState(null);
    const [editado, setEditado] = useState(null);
    const [formulario, setFormulario] = useState({ nombre: '', email: '', rol: 'cliente' });
    const [guardando, setGuardando] = useState(false);
    const [porDesactivar, setPorDesactivar] = useState(null);

    useEffect(() => {
        let vigente = true;

        usuarioService.listarUsuariosDesdeAPI(obtenerToken())
            .then((lista) => { if (vigente) setUsuarios(lista); })
            .catch((error) => { if (vigente) setAviso({ tipo: 'danger', texto: error.message }); })
            .finally(() => { if (vigente) setCargando(false); });

        return () => { vigente = false; };
    }, []);

    function reemplazar(actualizado) {
        setUsuarios((lista) => lista.map((u) => (u.id === actualizado.id ? actualizado : u)));
    }

    function abrirEdicion(u) {
        setAviso(null);
        setEditado(u);
        setFormulario({ nombre: u.nombre, email: u.email, rol: u.rol });
    }

    async function guardar(evento) {
        evento.preventDefault();
        setGuardando(true);

        try {
            const actualizado = await usuarioService.actualizarUsuarioEnAPI(editado.id, formulario, obtenerToken());
            reemplazar(actualizado);
            setAviso({ tipo: 'success', texto: `Usuario ${actualizado.email} actualizado.` });
            setEditado(null);
        } catch (error) {
            setAviso({ tipo: 'danger', texto: error.message });
        } finally {
            setGuardando(false);
        }
    }

    async function desactivar(u) {
        setPorDesactivar(null);

        try {
            const actualizado = await usuarioService.desactivarUsuarioEnAPI(u.id, obtenerToken());
            reemplazar(actualizado);
            setAviso({ tipo: 'success', texto: `Usuario ${actualizado.email} desactivado: ya no puede iniciar sesión.` });
        } catch (error) {
            setAviso({ tipo: 'danger', texto: error.message });
        }
    }

    async function reactivar(u) {
        try {
            const actualizado = await usuarioService.actualizarUsuarioEnAPI(u.id, { activo: true }, obtenerToken());
            reemplazar(actualizado);
            setAviso({ tipo: 'success', texto: `Usuario ${actualizado.email} reactivado.` });
        } catch (error) {
            setAviso({ tipo: 'danger', texto: error.message });
        }
    }

    return (
        <PlantillaAdmin roles={['admin']}>
            <h2 className="admin-titulo-seccion">Usuarios</h2>

            {aviso && <Alert variant={aviso.tipo}>{aviso.texto}</Alert>}

            {porDesactivar && (
                <Alert variant="warning">
                    ¿Desactivar a {porDesactivar.email}? No podrá iniciar sesión, pero se conserva su historial.
                    <span className="ms-3">
                        <Boton texto="Sí, desactivar" variante="danger" className="btn-sm me-2" onClick={() => desactivar(porDesactivar)} />
                        <Boton texto="Cancelar" variante="outline-secondary" className="btn-sm" onClick={() => setPorDesactivar(null)} />
                    </span>
                </Alert>
            )}

            {cargando ? <p role="status">Cargando usuarios…</p> : (
                <Table responsive striped bordered hover className="tabla-admin">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u) => {
                            const esYo = String(yo?.id) === u.id;

                            return (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.nombre}</td>
                                    <td>{u.email}</td>
                                    <td>{u.rol}</td>
                                    <td>{u.activo ? 'Activo' : 'Desactivado'}</td>
                                    <td>
                                        <Boton texto="Editar" variante="warning" className="me-2 btn-sm" onClick={() => abrirEdicion(u)} />
                                        {u.activo
                                            ? <Boton texto="Desactivar" variante="danger" className="btn-sm" deshabilitado={esYo} onClick={() => setPorDesactivar(u)} />
                                            : <Boton texto="Reactivar" variante="success" className="btn-sm" onClick={() => reactivar(u)} />}
                                    </td>
                                </tr>
                            );
                        })}
                        {usuarios.length === 0 && (
                            <tr><td colSpan={6} className="text-center">No hay usuarios registrados.</td></tr>
                        )}
                    </tbody>
                </Table>
            )}

            <Modal show={editado !== null} onHide={() => setEditado(null)}>
                <form onSubmit={guardar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label" htmlFor="usuario-nombre">Nombre</label>
                        <input id="usuario-nombre" className="form-control mb-3" required maxLength={120}
                            value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} />

                        <label className="form-label" htmlFor="usuario-email">Correo</label>
                        <input id="usuario-email" type="email" className="form-control mb-3" required
                            value={formulario.email} onChange={(e) => setFormulario({ ...formulario, email: e.target.value })} />

                        <label className="form-label" htmlFor="usuario-rol">Rol</label>
                        <select id="usuario-rol" className="form-select"
                            disabled={editado !== null && String(yo?.id) === editado.id}
                            value={formulario.rol} onChange={(e) => setFormulario({ ...formulario, rol: e.target.value })}>
                            {ROLES.map((rol) => <option key={rol} value={rol}>{rol}</option>)}
                        </select>
                        {editado !== null && String(yo?.id) === editado.id && (
                            <p className="form-text">No puedes cambiar tu propio rol.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Boton texto="Cancelar" variante="outline-secondary" onClick={() => setEditado(null)} />
                        <Boton tipo="submit" texto={guardando ? 'Guardando…' : 'Guardar'} deshabilitado={guardando} />
                    </Modal.Footer>
                </form>
            </Modal>
        </PlantillaAdmin>
    );
}

export default PaginaAdminUsuarios;

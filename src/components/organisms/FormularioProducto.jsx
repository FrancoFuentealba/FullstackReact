import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import CampoSelector from '../molecules/CampoSelector';
import Boton from '../atoms/Boton';
import { validarDatosProducto, sinErrores } from '../../utils/validaciones';

const PRODUCTO_VACIO = {
    codigo: '', nombre: '', marca: '', modelo: '',
    categoria: '', precio: '', stock: '', imagen: '',
};

const SIN_ERRORES = {
    codigo: '', nombre: '', marca: '', modelo: '',
    categoria: '', precio: '', stock: '',
};

function FormularioProducto(props) {

    const editando = Boolean(props.productoInicial);
    const [datos, setDatos] = useState(props.productoInicial || PRODUCTO_VACIO);
    const [errores, setErrores] = useState(SIN_ERRORES);

    useEffect(() => {
        setDatos(props.productoInicial || PRODUCTO_VACIO);
        setErrores(SIN_ERRORES);
    }, [props.productoInicial]);

    const opcionesCategoria = [
        { valor: '', texto: 'Seleccione una categoría...' },
        ...(props.categorias || []).map((categoria) => ({ valor: categoria, texto: categoria })),
    ];

    function manejarCambio(e) {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    }

    function alGuardar(evento) {
        evento.preventDefault();

        const nuevosErrores = validarDatosProducto(datos, !editando);
        setErrores(nuevosErrores);

        if (sinErrores(nuevosErrores) && props.onGuardar) {
            props.onGuardar({
                ...datos,
                precio: Number(datos.precio),
                stock: Number(datos.stock),
            });
        }
    }

    return (
        <Form onSubmit={alGuardar} noValidate className="formulario-producto card p-4">
            <h4 className="mb-4">{editando ? 'Editar Producto' : 'Nuevo Producto'}</h4>
            <Row>
                <Col md={6}>
                    {!editando && (
                        <CampoFormulario
                            id="codigo" name="codigo" etiqueta="Código"
                            valor={datos.codigo} onChange={manejarCambio} error={errores.codigo} requerido
                        />
                    )}
                    <CampoFormulario
                        id="nombre" name="nombre" etiqueta="Nombre"
                        valor={datos.nombre} onChange={manejarCambio} error={errores.nombre} requerido
                    />
                    <CampoFormulario
                        id="marca" name="marca" etiqueta="Marca"
                        valor={datos.marca} onChange={manejarCambio} error={errores.marca} requerido
                    />
                    <CampoFormulario
                        id="modelo" name="modelo" etiqueta="Modelo"
                        valor={datos.modelo} onChange={manejarCambio} error={errores.modelo} requerido
                    />
                </Col>
                <Col md={6}>
                    <CampoSelector
                        id="categoria" name="categoria" etiqueta="Categoría"
                        opciones={opcionesCategoria}
                        valor={datos.categoria} onChange={manejarCambio} error={errores.categoria}
                    />
                    <Row>
                        <Col xs={6}>
                            <CampoFormulario
                                id="precio" name="precio" etiqueta="Precio" tipo="number"
                                valor={datos.precio} onChange={manejarCambio} error={errores.precio} requerido
                            />
                        </Col>
                        <Col xs={6}>
                            <CampoFormulario
                                id="stock" name="stock" etiqueta="Stock" tipo="number"
                                valor={datos.stock} onChange={manejarCambio} error={errores.stock} requerido
                            />
                        </Col>
                    </Row>
                    <CampoFormulario
                        id="imagen" name="imagen" etiqueta="URL de Imagen"
                        valor={datos.imagen} onChange={manejarCambio}
                    />
                </Col>
            </Row>
            <div className="d-flex justify-content-end mt-3">
                <Boton texto="Cancelar" variante="secondary" className="me-2" onClick={props.onCancelar} />
                <Boton tipo="submit" texto="Guardar Producto" variante="primary" />
            </div>
        </Form>
    )
}

export default FormularioProducto;
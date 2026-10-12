import { Card, ListGroup } from "react-bootstrap";
import Precio from "../atoms/Precio";

function ResumenCompra(props) {
    const items = props.items || [];
    const total = props.total || 0;

    return (
        <Card className="resumen-compra">
            <Card.Header className="bg-dark text-white">Resumen de tu pedido</Card.Header>
            <ListGroup variant="flush">
                {items.map((item) => (
                    <ListGroup.Item
                        key={item.producto.codigo}
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <h6 className="my-0">{item.producto.nombre}</h6>
                            <small className="text-muted">Cant: {item.cantidad}</small>
                        </div>
                        <span className="text-muted">
                            <Precio valor={item.producto.precio * item.cantidad} />
                        </span>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between bg-light">
                    <span>Total (CLP)</span>
                    <strong><Precio valor={total} /></strong>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default ResumenCompra;
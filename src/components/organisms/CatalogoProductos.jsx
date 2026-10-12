import { useState } from 'react';
import FiltroCategoria from '../molecules/FiltroCategoria';
import ProductGrid from './ProductGrid';

function CatalogoProductos(props) {
    const productos = props.productos || [];
    const [categoria, setCategoria] = useState('todas');

    const categorias = [...new Set(productos.map((p) => p.categoria))];

    const productosVisibles =
        categoria === 'todas'
            ? productos
            : productos.filter((p) => p.categoria === categoria);

    return (
        <section className="catalogo-productos">
            <FiltroCategoria
                categorias={categorias}
                valor={categoria}
                onCambiar={setCategoria}
            />

            <p className="catalogo-cantidad">
                {productosVisibles.length} {productosVisibles.length === 1 ? 'producto' : 'productos'}
            </p>

            <ProductGrid productos={productosVisibles} onAgregar={props.onAgregar} />
        </section>
    );
}

export default CatalogoProductos;
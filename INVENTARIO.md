# Inventario de Componentes (Atomic Design) — Proyecto AudioMax

---

## 1. Detalle del Inventario de Componentes

### Átomos (`src/components/atoms/`)
* **`Button`**: Botones reutilizables (de compra, envío de formularios, navegación).
* **`Input`**: Campos de entrada para texto, contraseña o email.
* **`Badge`**: Etiquetas pequeñas para estados de stock, ofertas o categorías.
* **`Typography`**: Títulos (`<h1>`–`<h6>`) y párrafos formateados.
* **`Image`**: Componente básico para avatares, logos o imágenes de productos.

### Moléculas (`src/components/molecules/`)
* **`SearchBar`**: Campo de texto combinado con un botón para realizar búsquedas.
* **`FormField`**: Agrupación de etiqueta (`label`), campo de entrada (`input`) y validación.
* **`ProductCard`**: Tarjeta individual (imagen, nombre, precio, botón de agregar).
* **`NavItem`**: Enlace individual de navegación con indicador de estado activo.
* **`CartSummaryItem`**: Fila resumen de un producto dentro del carrito.

### Organismos (`src/components/organisms/`)
* **`Navbar`**: Barra de navegación superior (logo, enlaces, buscador, carrito).
* **`Footer`**: Pie de página institucional (derechos, enlaces, redes).
* **`LoginForm` / `RegisterForm`**: Formulario completo de autenticación.
* **`ProductGrid`**: Rejilla responsiva de productos para el catálogo.
* **`HeroSection`**: Banner principal publicitario de la página de inicio.

### Plantillas (`src/components/templates/`)
* **`MainLayout`**: Estructura base (`Navbar` + `<main>` + `Footer`).
* **`AuthLayout`**: Maquetación centrada para Login / Registro.

### Páginas (`src/pages/`)
* **`Home` (`home.jsx`)**: Vista principal estructurada con `MainLayout`.
* **`Catalogo` (`catalogo.jsx`)**: Vista de exploración de productos.

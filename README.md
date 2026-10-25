# AudioMax · Sonido Vivo

**Nombre del equipo:** Los Androides

| Integrante | Correo |
|---|---|
| Cristóbal Aguilera | cri.aguileraa@duocuc.cl |
| Franco Fuentealba Arce | fr.fuentealbaa@duocuc.cl |
| Aaron Hernández | aa.hernandezn@duocuc.cl |

**Asignatura:** DSY1104 · Desarrollo Fullstack II · Evaluación Parcial 2

**Caso:** Sonido Vivo (AudioMax)

## Descripción del caso

Sitio web que vende instrumentos y accesorios musicales para músicos y profesionales. La plataforma soluciona la dificultad de encontrar instrumentos en un solo sitio: ofrece un catálogo con filtros por categoría, búsqueda, ofertas, un carrito de compras y un flujo de compra con pago simulado. Además incluye un panel de administración para gestionar el inventario y los pedidos.

## Funcionalidades

**Cliente**
- Catálogo, categorías, ofertas con descuento y buscador de productos.
- Detalle de cada producto (`/producto/:id`).
- Carrito de compras que se conserva al recargar la página, con tope según el stock disponible.
- Registro e inicio de sesión.
- Checkout con validación de datos y compra exitosa o fallida (por ejemplo, si el producto se agotó).
- Mis pedidos, con la etapa de cada pedido (En preparación, Despachado, Entregado).

**Administrador**
- Gestión de productos: crear, editar y eliminar (con confirmación).
- Gestión de pedidos: cambiar la etapa de cada pedido.
- El panel solo es accesible con el rol `admin`.

## Tecnologías utilizadas

React 19 · Vite · React Bootstrap · React Router DOM · Vitest y Testing Library

## Cómo ejecutar el proyecto

```bash
npm install        # instala las dependencias
npm run dev        # servidor de desarrollo
npm run build      # genera la versión de producción
npm run test:run   # ejecuta todas las pruebas una vez
npm run test:cov   # pruebas + informe de cobertura 
```

### Usuarios de prueba

| Rol | Correo | Clave |
|---|---|---|
| Administrador | admin@audiomax.cl | admin123 |
| Cliente | cliente@audiomax.cl | cliente123 |

También se puede crear una cuenta de cliente desde `/registro`.

## Estructura del proyecto

El proyecto sigue **Atomic Design** y separa la lógica de la interfaz:

```text
AudioMax/
├── public/                    # Recursos estáticos (imágenes en public/img)
├── src/
│   ├── components/
│   │   ├── atoms/             # Piezas mínimas: Boton, CampoTexto, Precio, Selector...
│   │   ├── molecules/         # Combinaciones: TarjetaProducto, ItemCarrito, EstadoPedido...
│   │   ├── organisms/         # Bloques completos: NavbarAudioMax, Carrito, TablaProductos...
│   │   └── templates/         # Estructuras de página: PlantillaPublica, PlantillaAdmin
│   ├── pages/                 # Páginas (una por ruta): Inicio, Catalogo, Checkout, AdminProductos...
│   ├── context/               # Estado compartido: Carrito, Productos, Auth, Pedidos
│   ├── services/              # Datos y reglas con localStorage: productoService, pedidoService, authService
│   ├── hooks/                 # Hooks propios: useTituloPagina
│   ├── utils/                 # Funciones puras: validaciones, carrito, pedidos, ofertas, busqueda, stock
│   ├── data/                  # Datos iniciales: productos y usuarios de ejemplo
│   ├── App.jsx                # Providers y rutas
│   └── main.jsx               # Punto de entrada
├── vite.config.js             # Configuración de Vite y de Vitest
└── package.json               # Dependencias y scripts
```

Cada archivo de prueba (`*.test.js` / `*.test.jsx`) está junto al archivo que prueba.

### Rutas principales

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/catalogo` · `/categorias` · `/categorias/:nombre` | Catálogo y categorías |
| `/ofertas` · `/buscar?q=` | Ofertas y resultados de búsqueda |
| `/producto/:id` | Detalle de un producto |
| `/carrito` · `/checkout` | Carrito y pago |
| `/compra-exitosa` · `/compra-fallida` | Resultado de la compra |
| `/login` · `/registro` | Autenticación |
| `/mis-pedidos` | Pedidos del cliente |
| `/admin/productos` · `/admin/pedidos` | Panel de administración |

## Pruebas unitarias

Se usa **Vitest** con **Testing Library**. Resultado de la última ejecución de `npm run test:cov`:

- **21 archivos de prueba y 128 pruebas, todas aprobadas.**
- **Cobertura total: 79,4 %** de sentencias (utils 100 %, hooks 100 %, services 95 %, context 93 %).

Se prueban funciones puras (carrito, validaciones, pedidos, ofertas, búsqueda), servicios con `localStorage`, contextos, componentes y las páginas de administración.

## Notas

- **No hay backend:** los datos (productos, pedidos, usuarios y sesión) se guardan en el `localStorage` del navegador. Por esa razón las claves se almacenan como texto; esto es solo para el proyecto académico y no es una práctica válida en un sistema real.
- **Pago simulado:** el checkout valida los datos pero no cobra nada. Del número de tarjeta solo se guardan los últimos 4 dígitos.
- **Control de versiones:** los commits con el usuario `ubuntu` corresponden a Cristóbal Aguilera (su cuenta anterior fue bloqueada).

## Documentación

Material complementario del proyecto (ERS y otros documentos): [Carpeta de Google Drive del equipo](https://drive.google.com/drive/u/2/folders/1_5g77gu0gb3D_mR7W476sDRTItrswFoy)
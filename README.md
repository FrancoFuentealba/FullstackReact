# AudioMax · Sonido Vivo

**Equipo:** Los Androides
**Integrantes:** Cristóbal Aguilera, Franco Fuentealba Arce y Aaron Hernández
**Asignatura:** DSY1104 · Desarrollo Fullstack II · 2026
**Caso:** Sonido Vivo (AudioMax)

## Repositorios

- Frontend React: [FullstackReact](https://github.com/FrancoFuentealba/FullstackReact)
- Backend Node.js: [sonidovivo-backend](https://github.com/aaronhernandez2006/sonidovivo-backend)
- Documentación interactiva del API, cuando el backend esté ejecutándose: `/api/docs`. Su contrato OpenAPI está versionado en `src/openapi.json` dentro del repositorio backend.

## Descripción y funcionalidades

Sitio web para vender instrumentos y accesorios musicales. Incluye catálogo, filtros por categoría, búsqueda y ofertas; detalle de productos; carrito; registro e inicio de sesión; checkout de pago simulado; historial de pedidos; y paneles de administración de inventario y pedidos.

El frontend consulta el catálogo, autentica usuarios y envía compras e historial al backend. El stock y los precios definitivos se validan/calculan en servidor. El backend es responsable de persistir usuarios, catálogo y pedidos en PostgreSQL.

## Tecnologías

React 19, Vite, React Bootstrap, React Router DOM, Vitest, Testing Library, Node.js, Express, PostgreSQL en AWS RDS y JWT. La descripción de arquitectura, configuración, controles y rutas implementadas está en el [README del backend](https://github.com/aaronhernandez2006/sonidovivo-backend#readme).

## Cómo ejecutar el frontend

Requiere Node.js y npm. La API debe estar ejecutándose para que catálogo, login, compras e historial puedan comunicarse con el backend.

```bash
npm ci
npm run dev
npm run test:run
npm run build
```

Vite usa el proxy `/api` definido en `vite.config.js` durante el desarrollo. En producción, la configuración del host web debe enrutar `/api` al servidor backend y usar HTTPS. No incluir valores secretos en Vite ni en variables `VITE_*`, porque esas variables pueden acabar en el bundle público.

## Usuarios y credenciales

No se publican credenciales de prueba en este README. Registra una cuenta cliente desde `/registro` y úsala para iniciar sesión. El alta pública siempre asigna el rol `cliente`; las cuentas `admin` se provisionan mediante un procedimiento restringido en backend/base de datos. No almacenar ni compartir contraseñas o tokens en Git, capturas, consola o informes.

El token de acceso se conserva en memoria por la sesión de página. Al recargar, se debe iniciar sesión de nuevo. El carrito del frontend puede persistir por separado; eso no equivale a persistir la autenticación.

## Estructura

```text
src/
├── components/       # Atomic Design: atoms, molecules, organisms y templates
├── pages/            # Catálogo, detalle, checkout, historial y administración
├── context/          # Estado compartido: carrito, productos, autenticación y pedidos
├── services/         # Llamadas de API
├── hooks/            # Hooks propios
├── utils/            # Validaciones y funciones reutilizables
└── App.jsx           # Providers y rutas
```

Las pruebas `*.test.js` y `*.test.jsx` están junto al módulo relacionado. Vitest y Testing Library cubren utilidades, servicios, contextos, componentes y páginas.

## Rutas principales del frontend

| Ruta | Función |
|---|---|
| `/` | Inicio |
| `/catalogo`, `/categorias`, `/categorias/:nombre` | Catálogo y categorías |
| `/ofertas`, `/buscar?q=` | Ofertas y búsqueda |
| `/producto/:id` | Detalle de producto |
| `/carrito`, `/checkout` | Carrito y compra |
| `/compra-exitosa`, `/compra-fallida` | Resultado de la compra |
| `/login`, `/registro` | Sesión y registro |
| `/mis-pedidos` | Historial propio |
| `/admin/productos`, `/admin/pedidos` | Administración |

## Pruebas y estado

Verificación en la copia de trabajo preparada para esta entrega: `npm run test:run` aprobó 124 pruebas en 21 archivos; `npm run build` finalizó correctamente; y `npm audit` reportó cero vulnerabilidades después de aplicar actualizaciones compatibles sin forzar versiones mayores. Vuelve a ejecutar los comandos después de cualquier cambio local. La verificación real de endpoints, roles y base de datos se describe en el [README del backend](https://github.com/aaronhernandez2006/sonidovivo-backend#avance-y-resultados-comprobados).

## Material académico

ERS y documentos del equipo: [carpeta Google Drive](https://drive.google.com/drive/u/2/folders/1_5g77gu0gb3D_mR7W476sDRTItrswFoy). Comprueben que el docente tenga acceso de lectura y agreguen un enlace directo al ERD desde el README backend.

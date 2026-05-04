# Mercado Vecino - Hito 2 Desarrollo Frontend

Marketplace local desarrollado como entrega del Hito 2 de Desafio Latam. El foco principal de esta version es el frontend con React, React Router, componentes reutilizables, hooks, Context API, renderizado dinamico, rutas publicas/privadas y una experiencia visual responsive.

## Tecnologias principales

- React 19
- Vite 6
- React Router DOM
- Context API
- Hooks de React y hooks personalizados
- AnimeJS para animaciones
- Lucide React para iconografia
- CSS responsive sin framework externo
- LocalStorage para persistencia del prototipo

## Funcionalidades

- Home publico con hero animado usando AnimeJS.
- Navegacion con rutas publicas y privadas.
- Registro e inicio de sesion demo.
- Galeria de publicaciones con filtros por texto y categoria.
- Tarjetas de productos reutilizables con imagen, precio, estado y ubicacion.
- Detalle de publicacion con galeria de imagenes estilo marketplace.
- Modal de imagenes con miniaturas y navegacion.
- Perfil privado con publicaciones editables.
- Crear, editar y eliminar publicaciones.
- Subida multiple de imagenes con optimizacion previa.
- Validaciones visibles en formularios.
- Publicaciones semilla asignadas a la cuenta demo.
- Imagenes locales para que el marketplace no dependa de links externos.
- Diseno adaptable a computador y celular.

## Credenciales demo

Puedes ingresar con:

```text
Email: demo@mercadovecino.cl
Contrasena: 12345678
```

Al iniciar sesion, todas las publicaciones base quedan disponibles en **Mi perfil** para editar.

## Estructura del proyecto

```text
marketplace-hito2/
  frontend/
    index.html
    package.json
    vite.config.js
    styles.css
    public/
      assets/
        bicicleta-urbana.svg
        notebook-lenovo.svg
        silla-ergonomica.svg
        fotografia-producto.svg
    src/
      App.jsx
      main.jsx
      components/
      context/
      data/
      hooks/
      pages/
      services/
      utils/
  backend/
    package.json
    .env.example
    src/
  database/
    schema.sql
    seed.sql
  docs/
    01-boceto-vistas.md
    02-navegacion.md
    03-dependencias.md
    04-base-datos.md
    05-contrato-api.md
    06-hito-2-frontend.md
  package.json
  README.md
```

## Instalacion

Desde la raiz del proyecto:

```bash
npm install
npm install --prefix frontend
```

El segundo comando instala todas las dependencias del frontend declaradas en `frontend/package.json`, incluyendo:

```bash
animejs
react-router-dom
lucide-react
```

Si se quisiera instalar AnimeJS manualmente en una copia nueva del frontend, el comando seria:

```bash
npm install animejs --prefix frontend
```

## Ejecutar frontend

Desde la raiz:

```bash
npm start
```

Tambien puedes ejecutarlo desde la carpeta `frontend`:

```bash
cd frontend
npm run dev
```

Luego abre:

```text
http://localhost:5173
```

Vite tambien expone una URL de red para probar desde otro dispositivo conectado a la misma red.

## Compilar

```bash
npm run frontend:build
```

O directamente:

```bash
cd frontend
npm run build
```

## Backend y base de datos

El backend y la base de datos se incluyen como soporte del proyecto Hito 2, pero la evaluacion de este hito se centra en el desarrollo frontend.

Variables de entorno de ejemplo:

```env
PORT=3000
DATABASE_URL=postgres://postgres:TU_PASSWORD@localhost:5432/marketplace_hito2
JWT_SECRET=clave_secreta_desarrollo
```

Los scripts SQL estan en:

```text
database/schema.sql
database/seed.sql
```

## Cumplimiento rubrica Hito 2

| Criterio | Evidencia |
|---|---|
| Crear proyecto React e instalar dependencias | `frontend/package.json`, React, Vite, AnimeJS, React Router y Lucide. |
| Utilizar React Router | `frontend/src/App.jsx` usa `Routes`, `Route`, `Navigate`, `Link`, `NavLink`, rutas dinamicas y redireccion programatica. |
| Reutilizar componentes con props y renderizacion dinamica | `ProductCard`, `ProductGallery`, `PostForm`, `CategoryGrid`, `Layout`, `ProductPhoto`. |
| Uso de hooks para desarrollo agil y reactivo | `useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`, `useRef` y hooks personalizados en `hooks/useAnime.js`. |
| Context para estado global | `frontend/src/context/MarketplaceContext.jsx` centraliza usuario, publicaciones, filtros, autenticacion y acciones CRUD. |

## Notas de entrega

Este proyecto esta preparado para abrirse en Visual Studio Code, instalar dependencias y ejecutarse con `npm start` desde la raiz. La carpeta `node_modules` y los archivos generados de build no se suben al repositorio.

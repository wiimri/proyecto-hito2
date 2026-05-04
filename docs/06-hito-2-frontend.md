# 06 - Hito 2 Desarrollo Frontend

El frontend fue migrado a una aplicacion React con Vite ubicada en `frontend/`.

## Requerimientos de la rubrica

### 1. Nuevo proyecto React e instalacion de dependencias

Proyecto React/Vite:

```text
frontend/package.json
frontend/src/main.jsx
frontend/src/App.jsx
```

Dependencias instaladas:

```text
react
react-dom
react-router-dom
vite
@vitejs/plugin-react
lucide-react
animejs
```

Comandos:

```bash
cd frontend
npm install
npm run dev
```

## 2. React Router

El enrutador se declara en:

```text
frontend/src/main.jsx
frontend/src/App.jsx
```

Rutas publicas:

```text
/
/login
/register
/publicaciones
/publicaciones/:id
```

Rutas privadas:

```text
/perfil
/publicar
/editar/:id
```

Se usan:

- `BrowserRouter`
- `Routes`
- `Route`
- `NavLink`
- `Link`
- `Navigate`
- `useNavigate`
- `useParams`

La redireccion programatica se usa en login, registro, logout, creacion, edicion y eliminacion de publicaciones.

## 3. Componentes reutilizables, props y renderizacion dinamica

Componentes principales:

```text
components/Layout.jsx
components/ProductCard.jsx
components/ProductPhoto.jsx
components/CategoryGrid.jsx
components/PostForm.jsx
```

Ejemplos:

- `ProductCard` recibe `product` por props.
- `ProductPhoto` recibe `product` y renderiza imagen local, URL o fallback visual.
- `CategoryGrid` recibe `categories` y renderiza dinamicamente.
- `PostForm` recibe `initialValues`, `categories`, `onSubmit`, `onDelete` y `onRemoveImage`.

## 4. Uso de hooks

Hooks utilizados:

- `useState`: formularios y estado de UI.
- `useEffect`: persistencia de sesion y publicaciones en `localStorage`.
- `useMemo`: publicaciones filtradas, publicaciones propias y valores derivados.
- `useCallback`: acciones globales estables del contexto.
- `useContext`: consumo de estado global.
- `useNavigate`: redireccion programatica.
- `useParams`: detalle y edicion por id.
- `useLocation`: mensaje contextual cuando una ruta privada redirige a login.

Hooks personalizados:

- `usePageIntro`: anima la entrada de vistas con `animejs`.
- `useStaggeredList`: anima grillas y listas con `stagger`.

Las animaciones respetan `prefers-reduced-motion` para evitar movimiento cuando el usuario lo solicita.

## 5. Context API

Contexto:

```text
frontend/src/context/MarketplaceContext.jsx
```

Estado global manejado:

- Usuario autenticado.
- Publicaciones.
- Categorias.
- Filtros de galeria.
- Publicaciones filtradas.
- Publicaciones propias.
- Acciones de login, registro y logout.
- Acciones CRUD de publicaciones.

El contexto se utiliza desde paginas y componentes mediante el hook:

```js
useMarketplace()
```

## Preparacion para consumo de API

El servicio base para consumir la API del proyecto esta en:

```text
frontend/src/services/api.js
```

Lee `VITE_API_URL` o usa por defecto:

```text
http://localhost:3000/api
```

import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogIn, LogOut, PlusCircle, Store, UserRound } from "lucide-react";
import { useMarketplace } from "../context/MarketplaceContext.jsx";

export default function Layout() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useMarketplace();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <header className="topbar">
        <Link className="brand" to="/">
          <Store size={24} />
          Mercado Vecino
        </Link>
        <nav className="nav" aria-label="Navegacion principal">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/publicaciones">Publicaciones</NavLink>
          {isAuthenticated && <NavLink to="/publicar">Crear</NavLink>}
          {isAuthenticated && <NavLink to="/perfil">Mi perfil</NavLink>}
        </nav>
        <div className="session-actions">
          {isAuthenticated ? (
            <>
              <span className="session-name"><UserRound size={17} />{user.name}</span>
              <button type="button" onClick={handleLogout}><LogOut size={17} />Salir</button>
            </>
          ) : (
            <>
              <Link to="/login"><LogIn size={17} />Ingresar</Link>
              <Link className="button primary small" to="/register"><PlusCircle size={17} />Registrarse</Link>
            </>
          )}
        </div>
      </header>
      <main className="app">
        <Outlet />
      </main>
    </>
  );
}

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext.jsx";
import { usePageIntro } from "../hooks/useAnime.js";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useMarketplace();
  const [email, setEmail] = useState("demo@mercadovecino.cl");
  const [password, setPassword] = useState("12345678");
  const introRef = usePageIntro("login");

  useEffect(() => {
    if (isAuthenticated) navigate("/perfil", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
    navigate("/perfil", { replace: true });
  };

  return (
    <section className="auth-layout" ref={introRef}>
      <div>
        <p className="eyebrow">Inicio de sesion</p>
        <h1>Accede a tus publicaciones</h1>
        <p className="lead">
          {location.state?.reason === "private"
            ? "Debes iniciar sesion para acceder a esta vista privada."
            : "Las vistas privadas se habilitan cuando existe un usuario autenticado."}
        </p>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Email
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Contrasena
          <input required type="password" minLength="8" value={password} onChange={(event) => setPassword(event.target.value)} />
          <span className="field-hint">Usa al menos 8 caracteres.</span>
        </label>
        <button className="button primary" type="submit">Ingresar demo</button>
        <Link to="/register">Crear cuenta nueva</Link>
      </form>
    </section>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext.jsx";
import { usePageIntro } from "../hooks/useAnime.js";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useMarketplace();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const introRef = usePageIntro("register");

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(form);
    navigate("/perfil", { replace: true });
  };

  return (
    <section className="auth-layout" ref={introRef}>
      <div>
        <p className="eyebrow">Registro de usuarios</p>
        <h1>Crea tu cuenta</h1>
        <p className="lead">El registro permite publicar productos, guardar datos de contacto y administrar el perfil.</p>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Nombre completo
          <input required minLength="3" name="name" value={form.name} onChange={handleChange} placeholder="Ej: Camila Rojas" />
        </label>
        <label>
          Email
          <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="camila@mail.com" />
        </label>
        <label>
          Telefono
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+56 9 1234 5678" />
          <span className="field-hint">Opcional, visible para coordinar contacto.</span>
        </label>
        <label>
          Contrasena
          <input required type="password" minLength="8" name="password" value={form.password} onChange={handleChange} placeholder="Minimo 8 caracteres" />
          <span className="field-hint">Debe tener al menos 8 caracteres.</span>
        </label>
        <button className="button primary" type="submit">Registrarme</button>
        <Link to="/login">Ya tengo cuenta</Link>
      </form>
    </section>
  );
}

import { useState, FormEvent } from "react";
import "../styles/Login.scss";
import { Link } from "react-router-dom";
import Logo from "../../public/logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");

  function navigate(url: string) {
    window.location.href = url;
  }

  async function auth(): Promise<void> {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    navigate(data.url);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="form-container ">
      <div>
        <img src={Logo} className="logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Bienvenidos</h1>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Dirección de correo electrónico*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Continuar</button>
        <div className="text-container">
          <span>¿No tienes una cuenta?</span>
          <Link to="">Suscríbete</Link>
        </div>
        <button className="google-btn" onClick={() => auth()}>
          Continuar con Google
        </button>
      </form>
    </div>
  );
}

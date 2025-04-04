import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../Backend/SupaBase'; // Asegúrate de importar correctamente tu cliente de Supabase


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    setError(''); // Limpiar mensajes de error previos
    setSuccess(''); // Limpiar mensajes de éxito previos

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message); // Mostrar el mensaje de error si no se puede autenticar
      } else {
        setSuccess('Inicio de sesión exitoso');
        setTimeout(() => {
          navigate('/'); // Redirigir a la página principal después de 2 segundos
        }, 2000);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado, por favor intenta de nuevo');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center c3 text-white hero" style={{ minHeight: '100vh' } }>
      <div className="col-md-6 shadow p-4 rounded c2">
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn c1 w-100" >Iniciar sesión</button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        <div className="mt-3 text-center">
          <button onClick={handleSignupRedirect} className="btn btn-link c1t">
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </div>
      </div>
    </div>
    


  //   <div className="container d-flex justify-content-center align-items-center vh-100">
  //   <div className="row align-items-center">
  //     <div className="col-md-6 d-none d-md-block">
  //       <img
  //         src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png"
  //         className="phone-img"
  //         alt="Instagram Mobile View"
  //       />
  //     </div>
  //     <div className="col-md-6">
  //       <div className="login-box">
  //         <h3 className="mb-3">Instagram</h3>
  //         <form>
  //           <input
  //             type="text"
  //             className="form-control mb-2"
  //             placeholder="Teléfono, usuario o correo"
  //           />
  //           <input
  //             type="password"
  //             className="form-control mb-2"
  //             placeholder="Contraseña"
  //           />
  //           <button className="btn btn-primary w-100">Iniciar sesión</button>
  //         </form>
  //         <hr />
  //         <p>
  //           ¿No tienes una cuenta? <a href="#">Regístrate</a>
  //         </p>
  //       </div>
  //       <div className="text-center mt-3">
  //         <p>Descarga la aplicación</p>
  //         <div className="download-links">
  //           <img
  //             src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
  //             alt="Google Play"
  //           />
  //           <img
  //             src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
  //             alt="App Store"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { supabase } from '../Backend/SupaBase'; // Importar tu cliente de Supabase

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    setSuccess(''); // Limpiar mensajes previos
    try {
      // Registro en Supabase
      const { user, error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data:{ 
            username, // Guardar el nombre de usuario en los datos del usuario
          avatar_url: "/default-avatar.png", // URL de la imagen de perfil por defecto
          },
        },
      });
      
      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        // Si la creación del usuario es exitosa, mostrar mensaje de éxito
        setSuccess('Registro exitoso. Revisa tu correo electrónico para confirmar.');
        setEmail('');
        setPassword('');
        setUsername(''); // Limpiar el campo del nombre de usuario
        setTimeout(() => navigate('/login'), 3000); // Redirigir al login después de 3 segundos
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
    }
  };
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center text-white c2 hero" style={{ minHeight: '100vh' }}>
      <div className="col-md-6 shadow p-4 rounded c2">
        <h2 className="text-center mb-4">Registro</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn c1 w-100" >Registrarse</button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        <div className="mt-3 text-center">
          <button onClick={handleLoginRedirect} className="btn btn-link c1t">
            ¿Ya tienes cuenta? Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

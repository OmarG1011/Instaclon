import supabase from '../Backend/SupaBase';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Cerrar sesión
    navigate('/login'); // Redirigir al login
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Cerrar sesión
    </button>
  );
}

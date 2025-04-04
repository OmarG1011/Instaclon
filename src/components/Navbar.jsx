import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-bottom text-white"
      style={{ backgroundColor: "#BAFF39", zIndex: 1000 }}
    >
      <div className="container d-flex justify-content-around">
        {/* Ícono de Home */}
        <Link to="/" className="nav-link text-center">
          <i className="fas fa-home fa-lg "></i>
        </Link>

        {/* Ícono de Crear Publicación */}
        <Link to="/createPost" className="nav-link text-center">
          <i className="fas fa-plus-circle fa-lg"></i>
        </Link>

        {/* Ícono de Perfil con imagen circular */}
        {user && (
          <Link to="/profile" className="nav-link text-center">
            <img
              src={user.user_metadata?.avatar_url || "/default-avatar.png"}
              alt="Perfil"
              className="rounded-circle"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
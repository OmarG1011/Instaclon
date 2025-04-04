import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../Backend/SupaBase";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (user) {
      setProfileImage(user.user_metadata?.avatar_url || "/default-avatar.png");
    }
  }, [user, loading, navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${user.id}.${fileExt}`;

    // Subir la nueva imagen al bucket
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Error subiendo imagen:", error);
      setUploading(false);
      return;
    }

    const imageUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;

    // Actualizar los metadatos del usuario con la nueva URL del avatar
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: imageUrl },
    });

    if (updateError) {
      console.error("Error actualizando avatar_url:", updateError);
      setUploading(false);
      return;
    }

    // Actualizar el avatar_url en todas las publicaciones del usuario
    const { error: postsUpdateError } = await supabase
      .from("posts")
      .update({ avatar_url: imageUrl }) // Actualizar el campo avatar_url
      .eq("username", user.user_metadata.username); // Filtrar por el username del usuario

    if (postsUpdateError) {
      console.error("Error actualizando avatar_url en los posts:", postsUpdateError);
    } else {
      alert("¡Avatar actualizado con éxito en tu perfil, navbar y publicaciones!");
    }

    setProfileImage(imageUrl);
    setUploading(false);
  };

  if (loading) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid pt-5 c2 min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-header c1 text-white text-center">
                <h3>Mi Perfil</h3>
              </div>
              <div className="card-body text-center">
                {user && (
                  <>
                    {/* Imagen de perfil */}
                    <div className="mb-4">
                      <img
                        src={profileImage}
                        alt="Avatar"
                        className="rounded-circle img-thumbnail"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </div>

                    {/* Subir nueva imagen */}
                    <div className="mb-4">
                      <label htmlFor="avatar" className="form-label fw-bold">
                        Subir nueva imagen de perfil
                      </label>
                      <input
                        type="file"
                        id="avatar"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                    </div>

                    {/* Información del usuario */}
                    <p className="fw-bold">Correo: {user.email}</p>

                    {/* Botón de cerrar sesión */}
                    <button onClick={logout} className="btn btn-danger">
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

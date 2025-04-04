import React, { useState, useEffect } from "react";
import { supabase } from "../Backend/SupaBase";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error obteniendo usuario:", error);
      } else if (data?.user) {
        setUser(data.user);
      } else {
        console.warn("No hay un usuario autenticado.");
      }
    };

    fetchUser();
  }, []);

  const handleImageUpload = async (file) => {
    const fileExt = file.name.split(".").pop();
    const filePath = `profiles/${user.id}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("profiles")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Error subiendo imagen:", error);
      return null;
    }
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/profiles/${filePath}`;
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const imageUrl = await handleImageUpload(file);

    if (imageUrl) {
      const { error } = await supabase.auth.updateUser({
        data: { avatar_url: imageUrl }, // Actualizar el avatar en los metadatos
      });

      if (error) {
        console.error("Error actualizando avatar:", error);
      } else {
        alert("¡Foto de perfil actualizada!");
        setProfileImage(imageUrl);
      }
    }
    setLoading(false);
  };

  return (
    <div className="card p-3">
      <h5>Mi Perfil</h5>
      {user ? (
        <div>
          <div className="mb-3">
            <img
              src={profileImage || user.user_metadata.avatar_url || "/default-avatar.png"}
              alt="Foto de perfil"
              className="img-thumbnail"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
          <h6>Usuario: {user.user_metadata.username}</h6>
          <p>Email: {user.email}</p>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleProfileImageChange}
              disabled={loading}
            />
          </div>
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Subiendo..." : "Actualizar Foto"}
          </button>
        </div>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
};

export default Profile;
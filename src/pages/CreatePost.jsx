import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Backend/SupaBase";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const [description, setDescription] = useState(""); // Estado para la descripción
  const [image, setImage] = useState(null); // Estado para la imagen
  const [loading, setLoading] = useState(false); // Estado para mostrar el estado de carga
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // Función para subir la imagen a Supabase
  const handleImageUpload = async (file) => {
    const fileExt = file.name.split(".").pop();
    const filePath = `posts/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(filePath, file);

    if (error) {
      console.error("Error subiendo imagen:", error);
      return null;
    }
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/posts/${filePath}`;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert("Debes iniciar sesión para publicar.");
      setLoading(false);
      return;
    }

    let imageUrl = null;
    if (image) {
      imageUrl = await handleImageUpload(image);
    }

    const { error } = await supabase.from("posts").insert([
      {
        username: user.user_metadata.username,
        avatar_url: user.user_metadata.avatar_url, // Guardar el avatar del usuario
        image_url: imageUrl,
        description,
      },
    ]);

    if (error) {
      console.error("Error creando post:", error);
    } else {
      alert("¡Post creado!");
      setDescription("");
      setImage(null);
      navigate("/"); // Redirigir al Home después de publicar
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid pt-5 c2 min-vh-100 c1t">
        <h2 className="text-center mb-4 ">Crear Publicación</h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit}>
              {/* Campo de descripción */}
              <div className="mb-4">
                <label htmlFor="description" className="form-label fw-bold">
                  Descripción
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  placeholder="Escribe una descripción para tu publicación..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                />
              </div>

              {/* Campo de imagen */}
              <div className="mb-4">
                <label htmlFor="image" className="form-label fw-bold">
                  Imagen
                </label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Botón de enviar */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn c1 btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <i className="fas fa-spinner fa-spin"></i> Publicando...
                    </span>
                  ) : (
                    "Publicar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../Backend/SupaBase";
import Navbar from "../components/Navbar";
import DeletePostButton from "../components/DeletePostButton"; // Importar el botón de eliminación

const Home = () => {
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Error obteniendo posts:", error);
    else setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  if (loading) {
    return <p className="text-center">Cargando...</p>;
  }

  return (
    <>
      {/* Header */}
      <header className="py-3 c1">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h4 m-0">InstaClon</h1>
          {user && <p className="m-0 fs-4">{user.user_metadata.username}</p>}
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container-fluid pt-4 pb-5 c2 min-vh-100">
        {user ? (
          <div className="row justify-content-center">
            <div className="col-md-8">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="card mb-3 c1">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img
                          src={post.avatar_url || "/default-avatar.png"}
                          className="rounded-circle me-2"
                          alt="user"
                          style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                        <strong>{post.username || "Usuario Desconocido"}</strong>
                      </div>
                      {/* Mostrar el botón de eliminación solo si el usuario es el creador del post */}
                      {user && user.user_metadata.username === post.username && (
                        <DeletePostButton
                          postId={post.id}
                          onDelete={handlePostDelete}
                        />
                      )}
                    </div>
                    <img src={post.image_url} className="card-img-top" alt="post" />
                    <div className="card-body">
                      <p>
                        <strong>{post.username || "Usuario Desconocido"}</strong>{" "}
                        {post.description}
                      </p>
                      <p className="text-muted">
                        {new Date(post.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No hay publicaciones aún.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center">Cargando...</p>
        )}
      </div>

      {/* Navbar fija en la parte inferior */}
      <Navbar />
    </>
  );
};

export default Home;
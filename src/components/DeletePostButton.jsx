import React from "react";
import { supabase } from "../Backend/SupaBase";

const DeletePostButton = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId); // Filtrar por el ID del post

    if (error) {
      console.error("Error eliminando el post:", error);
      alert("Hubo un error al intentar eliminar el post.");
    } else {
      alert("¡Post eliminado con éxito!");
      if (onDelete) onDelete(postId); // Llamar a la función de callback para actualizar la lista de posts
    }
  };

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este post?")) {
          handleDelete();
        }
      }}
    >
      <i className="fas fa-trash"></i> Eliminar
    </button>
  );
};

export default DeletePostButton;
import { useState } from 'react';

const ImageUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      // Aquí deberías hacer la lógica para subir la imagen a Supabase o cualquier otro servicio de almacenamiento
      onUpload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="btn btn-primary mt-2">Upload</button>
    </div>
  );
};

export default ImageUploader;

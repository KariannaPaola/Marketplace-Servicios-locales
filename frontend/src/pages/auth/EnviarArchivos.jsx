import React, { useState } from 'react';
import { uploadImage } from '../../services/auth';

function SubirCedula() {
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState('');
  
  const handleFilesChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files) {
      alert("Selecciona al menos un archivo");
      return;
    }

    const formData = new FormData();
    formData.append('documents', files); 
    formData.append('type', 'cedula');

    try {
      await uploadImage(formData);
      setMessage("Documento subido correctamente");
      setFiles(null);
    } catch (error) {
      console.error("Error en la subida:", error);
      setMessage('Error al subir imagen'); 
    }
  };

  return (
  <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-xl">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h6 className="text-lg font-semibold text-gray-800 mb-2">
          Paso 3: Identificación
        </h6>
        <p>{message}</p>
        <h5 className="text-sm text-gray-600 mb-6">
          Para finalizar envía una foto de tu cédula de identidad y una foto de frente
          para comprobar tu identidad.
        </h5>
        <form onSubmit={handleSubmit}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Foto de tu cédula
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFilesChange}
            className="w-full mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="flex items-start gap-2 mb-6">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <p className="text-sm text-gray-600">
              Acepto los{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">
                términos y condiciones
              </span>
            </p>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl">
            Subir documentos de identidad
          </button>
        </form>
      </div>
    </div>
  </section>
);
}

export default SubirCedula;
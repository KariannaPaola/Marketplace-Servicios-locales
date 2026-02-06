import React, { useEffect, useState } from 'react';
import { getImagesAdmin } from '../../services/auth.js';
import { useParams } from 'react-router-dom';

function ReadImages() {
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await getImagesAdmin(id);
        setImages(data);
        console.log(images)
      } catch (error) {
        alert('error');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [id]);

  if (loading) return <p>Cargando imágenes...</p>;
  if (!images.length) {
    return <p>No se encontraron imágenes.</p>;
  }
  if (!images[0].files.length) {
    return <p>No se encontraron archivos.</p>;
  }
  return (
    <div>
      <h2>Foto de la Cédula</h2>
      <img
        src={images[0].files[0].url}
        alt="Cédula"
      />
    </div>
  );
}

export default ReadImages;


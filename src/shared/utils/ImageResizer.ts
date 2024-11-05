import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import axios from 'axios';

function useImageResizer(imageUrl, maxWidthOrHeight = 800, quality = 0.7) {
  const [resizedImage, setResizedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageUrl) return;

    let isMounted = true; 

    const resizeImage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(imageUrl, { responseType: 'blob' });
        const imageBlob = response.data;

        const compressedFile = await imageCompression(imageBlob, {
          maxWidthOrHeight,
          initialQuality: quality,
          useWebWorker: true,
        });

        const resizedImageUrl = URL.createObjectURL(compressedFile);
        if (isMounted) setResizedImage(resizedImageUrl);
      } catch (error) {
        console.error('Ошибка при сжатии изображения:', error);
        setError('Ошибка при сжатии изображения');
      } finally {
        setIsLoading(false);
      }
    };

    resizeImage();

    return () => {
      isMounted = false;
      if (resizedImage) URL.revokeObjectURL(resizedImage);
    };
  }, [imageUrl, maxWidthOrHeight, quality]);

  return { resizedImage, isLoading, error };
}

export default useImageResizer;

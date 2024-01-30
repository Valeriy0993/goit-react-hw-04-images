import React, { useState } from 'react';
import Loader from 'components/Loader/Loader';
import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ showModal, items }) => {
  const [loadedImages, setLoadedImages] = useState([]);

  const handleImageLoad = id => {
    setLoadedImages(prevLoadedImages => [...prevLoadedImages, id]);
  };

  const isAnyImageLoading = items.some(item => !loadedImages.includes(item.id));

  return (
    <ul className={styles.imageGallery}>
      {items.map(({ id, webformatURL, largeImageURL }) => (
        <li
          key={id}
          className={styles.imageGalleryItem}
          onClick={() => showModal(largeImageURL)}
        >
          <img
            className={styles.imageGalleryItemImage}
            src={webformatURL}
            alt="images"
            onLoad={() => handleImageLoad(id)}
          />
          <a href={webformatURL} target="_blank" rel="noopener noreferrer">
            {' '}
          </a>
        </li>
      ))}
      {isAnyImageLoading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </ul>
  );
};

export default ImageGalleryItem;

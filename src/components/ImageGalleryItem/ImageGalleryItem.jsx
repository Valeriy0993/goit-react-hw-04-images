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
        <ImageGalleryItemElement
          key={id}
          id={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          showModal={showModal}
          handleImageLoad={handleImageLoad}
        />
      ))}
      {isAnyImageLoading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </ul>
  );
};

const ImageGalleryItemElement = ({
  id,
  webformatURL,
  largeImageURL,
  showModal,
  handleImageLoad,
}) => {
  return (
    <li
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
  );
};

export default ImageGalleryItem;

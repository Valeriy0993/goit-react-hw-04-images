import React, { useState, useEffect, useRef } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './image-gallery.module.css';

const ImageGallery = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageDetails, setImageDetails] = useState({});
  const prevSearchRef = useRef('');

  useEffect(() => {
    prevSearchRef.current = search;
  }, [search]);

  useEffect(() => {
    if (!search) return;

    const fetchImages = async () => {
      const API_KEY = '40978321-f1efcc4bfa3c901177745f4fe';
      setLoading(true);

      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        if (!response.ok) {
          throw new Error('Помилка отримання даних з сервера');
        }

        const image = await response.json();

        if (!image.total) {
          return alert('Нажаль по вашому запиту нічого не знайдено');
        }

        setImages(prevImages => [...prevImages, ...image.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [search, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = ({ search }) => {
    if (search === prevSearchRef.current) {
      return alert(`Ви вже переглядаєте ${search}`);
    }

    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const showModal = largeImageURL => {
    setModalOpen(true);
    setImageDetails({ largeImageURL });
  };

  const closeModal = () => {
    setModalOpen(false);
    setImageDetails({});
  };

  const isImages = Boolean(images.length);

  return (
    <>
      <header className={styles.searchbar}>
        <Searchbar onSubmit={handleSearch} />
      </header>
      <div>
        {loading && <div className={styles.loader}></div>}
        {error && <p className={styles.error}>{error}</p>}
        {isImages && <ImageGalleryItem showModal={showModal} items={images} />}
        {isImages && (
          <div className={styles.buttonContainer}>
            <Button onClick={loadMore} type="button">
              Load more
            </Button>
          </div>
        )}
      </div>
      {modalOpen && (
        <Modal close={closeModal}>
          <img src={imageDetails.largeImageURL} alt="images" />
        </Modal>
      )}
    </>
  );
};

export default ImageGallery;

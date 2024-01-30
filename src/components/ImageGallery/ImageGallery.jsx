import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './image-gallery.module.css';

class ImageGallery extends Component {
  state = {
    search: '',
    loading: false,
    images: [],
    error: null,
    page: 1,
    modalOpen: false,
    imageDetails: {},
  };

  componentDidMount() {
    if (this.state.search) {
      this.fetchImages();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '40978321-f1efcc4bfa3c901177745f4fe';
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(image => {
          if (!image.total) {
            return alert('Нажаль по вашому запиту нічого не знайдено');
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...image.hits],
            totalImages: image.total,
          }));
        })
        .catch(error => error)
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSearch = ({ search }) => {
    if (this.state.search === search) {
      return alert(`Ви вже переглядаєте ${search}`);
    }
    this.setState({
      search,
      images: [],
      page: 1,
    });
  };

  showModal = largeImageURL => {
    this.setState({
      modalOpen: true,
      imageDetails: {
        largeImageURL,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      imageDetails: {},
    });
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const { loading, images, error, modalOpen, imageDetails } = this.state;

    const isImages = Boolean(images.length);
    return (
      <>
        <header className={styles.searchbar}>
          <Searchbar onSubmit={handleSearch} />
        </header>
        <div>
          {loading && <div className={styles.loader}></div>}
          {error && <p className={styles.error}>{error}</p>}
          {isImages && (
            <ImageGalleryItem showModal={showModal} items={images} />
          )}
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
  }
}

export default ImageGallery;

import ImageGallery from './ImageGallery/ImageGallery';

import styles from './app.module.css';

export const App = () => {
  return (
    <div className={styles.App}>
      <ImageGallery />
    </div>
  );
};

export default App;

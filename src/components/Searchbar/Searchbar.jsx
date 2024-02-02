import React, { useState, useEffect } from 'react';
import styles from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const lowercaseSearch = search.toLowerCase();
    onSubmit({ search: lowercaseSearch });
    setSearch('');
  };

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    };

    const inputElement = document.getElementById('searchInput');

    inputElement.addEventListener('keypress', handleKeyPress);

    return () => {
      inputElement.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleSubmit]);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          required
          value={search}
          onChange={handleChange}
          className={styles.searchFormInput}
          type="text"
          name="search"
          id="searchInput"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </>
  );
};

export default Searchbar;

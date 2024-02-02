import React, { useState, useEffect, useCallback } from 'react';
import styles from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const lowercaseSearch = search.toLowerCase();

      try {
        await onSubmit({ search: lowercaseSearch });
        setSearch('');
      } catch (error) {
        console.error('Error submitting search:', error);
      }
    },
    [onSubmit, search]
  );

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
    <form onSubmit={handleSubmit} className={styles.searchForm} id="searchForm">
      <button
        type="submit"
        className={styles.searchFormButton}
        htmlFor="searchForm"
      >
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
  );
};

export default Searchbar;

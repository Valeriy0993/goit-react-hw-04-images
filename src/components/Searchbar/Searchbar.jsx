import { Component } from 'react';

import styles from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const lowercaseSearch = this.state.search.toLowerCase();
    this.props.onSubmit({ search: lowercaseSearch });
    this.setState({
      search: '',
    });
  };
  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
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
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </>
    );
  }
}

export default Searchbar;

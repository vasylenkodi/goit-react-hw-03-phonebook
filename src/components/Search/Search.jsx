import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import css from './search.module.css';

export const Search = ({ value, onSearch }) => {
    const searchId = shortid.generate();
    return (
        <label htmlFor={searchId} className={css.searchLabel}>
            Find contacts by name
        <input
          id={searchId}
          type="text"
          name="filter"
          value={value}
          onChange={onSearch}
        />
      </label>
    );
};

Search.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func,
}
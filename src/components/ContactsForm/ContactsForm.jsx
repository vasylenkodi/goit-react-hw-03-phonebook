import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './contactsForm.module.css';

export default class ContactsForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    telId: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset() {
    this.setState({
      name: '',
      number: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className={css.contactsForm}>
        <label htmlFor={this.props.inputId}>
          Name
          <input
            id={this.props.inputId}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={this.props.telId}>
          Number
          <input
            id={this.props.telId}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.addContactButton}>
          Add contact
        </button>
      </form>
    );
  }
}

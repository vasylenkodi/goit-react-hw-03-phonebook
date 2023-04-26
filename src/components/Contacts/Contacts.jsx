import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './contacts.module.css';

export default class Contacts extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    contactDeleteHandler: PropTypes.func,
  }

  onContactDelete = (event) => {
    this.props.contactDeleteHandler(event.currentTarget.dataset.id);
  }

  render() {
    const contactsArray = this.props.contacts;
    return <ul className={css.contactsList}>{ contactsArray.map(contact => {
      return <li key={contact.id} className={css.contactsList__item} >{contact.name}: { contact.number} <button type='button' data-id={contact.id} onClick={this.onContactDelete} className={css.deleteButton}>delete</button> </li>
    })}</ul>;
  }
}

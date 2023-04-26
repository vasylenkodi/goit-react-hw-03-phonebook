import React, { Component } from 'react';
import shortid from 'shortid';
import ContactsForm from './ContactsForm';
import { Search } from './Search/Search';
import Contacts from './Contacts';
import css from './app.module.css';

export default class App extends Component {
  initialState = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  state = {
    contacts: this.initialState.contacts,
    filter: '',
    name: '',
    number: '',
  };

  formSubmitHandler = data => {
    data.id = shortid.generate();
    this.setState(prevState => {
      if (prevState.contacts.find(contact => {
        return contact.name === data.name;
      })) {
        alert(`${data.name} is already in contacts`);
        return;
      }
      return {
        contacts: [...prevState.contacts, data],
      };
    });
  };

  searchHandler = event => {
    const { value } = event.currentTarget;
    this.setState({
      filter: value,
    });
  };

  contactDeleteHandler = (idToDelete) => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => {
          return contact.id !== idToDelete; 
        })
      }
    })
  }

  componentDidMount() {
    const localStorageData = JSON.parse(localStorage.getItem('contacts'));
    if (localStorageData) {
      this.setState({ contacts: localStorageData });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const inputId = shortid.generate();
    const telId = shortid.generate();

    const filterToLowercase = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filterToLowercase);
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactsForm
          id={inputId}
          telId={telId}
          onSubmit={this.formSubmitHandler}
        />

        <h2>Contacts</h2>
        <Search value={this.state.filter} onSearch={this.searchHandler} />
        <Contacts
          contacts={visibleContacts}
          contactDeleteHandler={this.contactDeleteHandler}
        />
      </div>
    );
  }
}

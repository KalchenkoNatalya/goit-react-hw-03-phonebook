import css from './App.module.css';
import { FormAddContacts } from './FormAddContacts/FormAddContacts';
import { Component } from 'react';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  filterChange = value => {
    this.setState({ filter: value });
  };

  addContacts = (name, number) => {
    const isExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { id: nanoid(), name: name, number: number },
      ],
    }));
  };

  onRemoveBook = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
 componentDidMount () {
  const stringifiedContacts = localStorage.getItem('contacts');
  console.log(stringifiedContacts);
  const contacts = JSON.parse(stringifiedContacts) ?? this.state.contacts; 
  this.setState({contacts})
 
 }

 componentDidUpdate (prevProps, prevState) {
  if ( prevState.contacts.length !== this.state.contacts.length ) {
    const stringifiedContacts = JSON.stringify(this.state.contacts);
    localStorage.setItem('contacts', stringifiedContacts);
 }}

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div className={css.wrap}>
        <h2>Phonebook</h2>
        <FormAddContacts addContacts={this.addContacts} />
        
        <h2>Find contacts by name</h2>
        <Filter state={this.state} filterChange={this.filterChange} />

        <h2>Contacts</h2>
        {this.state.filter === '' ? (
          <ContactList
            contacts={this.state.contacts}
            onRemoveBook={this.onRemoveBook}
          />
        ) : (
          <ContactList contacts={filteredContacts} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  filterChange: PropTypes.func,
  addContacts: PropTypes.func,
  onRemoveBook: PropTypes.func,
};

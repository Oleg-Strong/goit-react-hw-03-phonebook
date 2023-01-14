import React, { Component } from 'react';
import shortid from 'shortid';
import css from './App.module.css';
import Section from './Section';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Natification from './Natification';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  checkContactBeforeAdding = contact => {
    const { name, number } = contact;
    const { contacts } = this.state;
    const normalazetName = name.toLowerCase().split(' ').join('');
    const normalazetNumber = number.split('-').join('');
    const existingName = contacts.some(
      ({ name }) => name.toLowerCase().split(' ').join('') === normalazetName
    );
    const existingNumber = contacts.some(
      ({ number }) => number.split('-').join('') === normalazetNumber
    );
    if (existingName || existingNumber) {
      toast.warn(
        `${existingNumber ? number : name} is already in contacts!!!`,
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        }
      );
      return;
    }
    this.addContact(contact);
  };

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    const initialContacts = JSON.parse(localStorage.getItem('contacts'));
    if (initialContacts) {
      this.setState({ contacts: initialContacts });
    }
  }

  addContact = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  changeFilter = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts
      .filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
      .sort((firstContact, secondContact) =>
        firstContact.name.localeCompare(secondContact.name)
      );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={css.appConteiner}>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.checkContactBeforeAdding}></ContactForm>
        </Section>
        <Section title="Contacts">
          <Filter name={filter} onFilterChange={this.changeFilter}></Filter>
          {filteredContacts.length === 0 ? (
            <Natification title={filter}></Natification>
          ) : (
            <ContactList
              phonebook={filteredContacts}
              onDeleteContact={this.deleteContact}
            ></ContactList>
          )}
        </Section>
        <ToastContainer />
      </div>
    );
  }
}
export default App;

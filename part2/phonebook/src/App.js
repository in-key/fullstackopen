import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import contactService from './services/Contacts';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const personShown = persons.filter( person => person.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    contactService
      .getAll()
      .then( initialContacts => {
        setPersons( initialContacts )
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add New Contact</h2>
      <ContactForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <ContactList personShown={personShown} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import contactService from './services/Contacts';
import Notification from './components/Notification';
import ErrorMessage from './components/ErrorMessage';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
      <Notification message={message}/>
      <ErrorMessage message={error}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add New Contact</h2>
      <ContactForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setMessage={setMessage} setError={setError}/>
      <h2>Numbers</h2>
      <ContactList personShown={personShown} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App

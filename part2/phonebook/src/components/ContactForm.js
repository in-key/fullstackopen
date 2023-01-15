import contactService from '../services/Contacts';

const ContactForm = ({newName, setNewName, persons, setPersons, newNumber, setNewNumber, setMessage, setError}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      name: newName,
      number: newNumber
    }


    for (let p of persons){
      if (newName === p.name){
        if (window.confirm(`${p.name} already added to phonebook. Replace the old number with a new one?`)){
          contactService
            .update(p.id, newContact)
            .then( returnedContact => {
              setMessage(`Updated ${p.name}'s info`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
              setPersons(persons.map( person => person.id !== p.id ? person : returnedContact));
              setNewName('');
              setNewNumber('');
            })
            .catch( error => {
              setError(`Information of ${p.name} has already been removed from server`);
              setTimeout(() => {
                setError(null);
              }, 5000);
              setPersons(persons.filter( person => person.name !== p.name));
            })
        }
        return;
      }
    }

    contactService
      .create(newContact)
      .then( returnedContact => {
        setMessage(`Added ${newContact.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedContact));
        setNewName('');
        setNewNumber('');
    })
  }

  return (
    <form onSubmit={handleSubmit}>
        <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
    </form>
  )
}

export default ContactForm;

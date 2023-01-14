const ContactForm = ({newName,setNewName,persons, setPersons, newNumber, setNewNumber}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        for (let p of persons){
          if (newName === p.name){
            alert(`${newName} already exists in phonebook`);
            return;
          }
        }

        setPersons(persons.concat({name: newName, number: newNumber}));
        setNewName('');
        setNewNumber('');
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

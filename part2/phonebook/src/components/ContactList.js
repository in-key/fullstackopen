import contactService from "../services/Contacts";

const ContactList = ({personShown, persons, setPersons}) => {
    const handleDelete = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            contactService
            .deleteContact(person.id)
            .then( res => {
                setPersons(persons.filter( p => p.id !== person.id ));
            })
            .catch( error => {
                setPersons(persons.filter( p => p.id !== person.id));
            })
        }
    }

    return (
        <div>
            {personShown.map( person => {
                return (
                <div key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => handleDelete(person)}>delete</button>
                </div>
                )
            })}
        </div>
    )
}

export default ContactList;

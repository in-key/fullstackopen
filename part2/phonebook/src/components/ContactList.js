const ContactList = ({personShown}) => {
    return (
        <div>
            {personShown.map( person => {
                return (
                <div key={person.name}>
                    {person.name} {person.number}
                </div>
                )
            })}
        </div>
    )
}

export default ContactList;

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

const morganformat = (tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}

app.use(morgan(morganformat));

let phonebook = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    Person.find({}).then( people => {
        res.json(people);
    })
})

app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${phonebook.length} people</div><div>${new Date()}}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.find( person => person.id === id );
    if (person){
        res.json(person);
    } else {
        res.status(404);
        res.json({message: "person not found"});
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter( person => person.id !== id);
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const {name, number} = req.body;
    // if (!name || !number){
    //     res.status(400);
    //     res.json({ error: 'name and number are required' });
    //     return;
    // }

    // for (let p of phonebook){
    //     if (p.name === name){
    //         res.status(400);
    //         res.json({ error: 'name must be unique' });
    //         return;
    //     }
    // }

    const person = new Person({
        name: name,
        number: number
    });

    person.save().then( savedPerson => {
        res.json( savedPerson );
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server is listening on port ${PORT}`))

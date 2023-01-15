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

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then( people => {
        res.json(people);
    })
    .catch(e => next(e));
})

app.get('/info', (req, res, next) => {
    Person.find({}).then( people => {
        res.send(`<div>Phonebook has info for ${people.length} people</div><div>${new Date()}}</div>`)
    })
    .catch(e => next(e));
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then( person => {
        if (person){
            res.json(person);
        } else {
            res.status(404);
            res.json({message: "person not found"});
        }
    })
    .catch( e => next(e))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    // phonebook = phonebook.filter( person => person.id !== id);
    Person.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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

    Person.findOne({name: name}).then( returnedPerson => {
        if (returnedPerson){
            res.status(400).json({
                error: `${name} already exists in phonebook`
            })
        } else {
            const person = new Person({
                name: name,
                number: number
            });

            person.save().then( savedPerson => {
                res.json( savedPerson );
            })
            .catch( e => next(e));
        }
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const {name, number} = req.body;

    const person = {
        name: name,
        number: number
    };

    Person.findByIdAndUpdate(req.params.id, person, {new: true, runValidators: true, context: 'query'})
        .then( updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server is listening on port ${PORT}`))

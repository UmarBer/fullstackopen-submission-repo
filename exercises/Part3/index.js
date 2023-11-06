const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());

morgan.token('custom', function (req, res) {
  return res._data ? JSON.stringify(res._data) : '';
});
app.use(morgan(':method :url :status :response-time ms :custom'));
app.use(cors());
app.use(express.static('build'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
];
// Generate new id
const generateNewId = () => {
  const maxId = persons.length ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

// Get list of all persons
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// Get info on how many persons and also the date
app.get('/info', (request, response) => {
  const numberOfPeople = persons.length;
  const date = Date();
  response.send(
    `<p>Phonebook has info for ${numberOfPeople} people</p><br/>${date}`
  );
});

// Get a single person
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// Delete a single person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end;
});

// Add a person
app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body) {
    return response.status(404).json({
      error: 'content missing'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateNewId()
  };
  if (!person.name) {
    return response.status(404).json({
      error: 'name is missing'
    });
  }

  if (!person.number) {
    return response.status(404).json({
      error: 'number is missing'
    });
  }

  const nameToCheck = person.name;

  const duplicates = persons.filter((person) => person.name === nameToCheck);

  if (duplicates.length) {
    return response.status(404).json({
      error: 'name must be unique'
    });
  }

  response._data = person;
  persons = persons.concat(person);
  response.json(person);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

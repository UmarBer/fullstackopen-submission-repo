import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const checkIfNameExists = (name, persons) => {
  //   if (persons.some((person) => person.name === name)) {
  //     return alert(`${name} is already added to the phonebook`);
  //   }
  // };

  const addName = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber
    };
    const currentName = persons.filter(
      (person) => person.name === newContact.name
    );
    if (currentName.length === 0) {
      personService
        .create(newContact)
        .then((returnedContact) => {
          setPersons([...persons, returnedContact]);
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => setMessage(error.response.data.error));
    } else {
      if (
        window.confirm(
          `${newContact.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(currentName[0].id, newContact)
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            );
            setPersons(updatedPersons);
            setMessage(`Updated ${newContact.name}'s number`);
          })
          .catch((error) => setMessage(error.response.data.error));
      }
    }
  };

  const handlePersonDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
          setMessage(`Removed ${name} from phonebook`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAddName = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => event.preventDefault();

  const handleFilter = (event) => {
    if (!event.target.value) return setFilteredPersons([]);

    const searchTerm = event.target.value.toLowerCase();

    const resultsArray = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm)
    );

    setFilteredPersons(resultsArray);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter
        onSubmit={handleSubmit}
        onChange={handleFilter}
        filteredPersons={filteredPersons}
      />

      <h2>add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleAddName={handleAddName}
        handleAddNumber={handleAddNumber}
        addName={addName}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} handlePersonDelete={handlePersonDelete} />
    </div>
  );
};

export default App;

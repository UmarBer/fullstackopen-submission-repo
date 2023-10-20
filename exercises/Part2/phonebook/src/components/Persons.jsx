import React from 'react';

const Persons = ({ persons, handlePersonDelete }) => {
  return (
    <>
      <ul>
        {persons.map((person) => (
          <li
            key={`${person.name}-${person.number}-${person.index}`}
            style={{ listStyle: 'none' }}
          >
            {person.name} {person.number}
            <button onClick={() => handlePersonDelete(person.id, person.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;

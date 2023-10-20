import React from 'react';

function Filter({ handleSubmit, onChange, filteredPersons }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          filter shown with <input onChange={onChange} />
        </div>
      </form>
      <div>
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.name} style={{ listStyle: 'none' }}>
              {person.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Filter;

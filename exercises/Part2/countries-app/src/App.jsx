import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Countries from './Components/Countries';
import CountryInfo from './Components/CountryInfo';

function App() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setCountries(response.data);
        console.log(countries);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    setCountriesToDisplay(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  return (
    <>
      <div>
        <div>
          <p>find countries</p> <input value={query} onChange={handleSearch} />
        </div>
        {countriesToDisplay.length === 1 ? (
          <CountryInfo country={countriesToDisplay[0]} />
        ) : null}
        {countriesToDisplay.length > 10 ? (
          <div>Too many matches, please narrow down your search</div>
        ) : (
          <Countries
            countriesToDisplay={countriesToDisplay}
            setCountriesToDisplay={setCountriesToDisplay}
          />
        )}
      </div>
    </>
  );
}

export default App;

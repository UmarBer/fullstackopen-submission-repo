const Countries = ({ countriesToDisplay, setCountriesToDisplay }) => {
  if (countriesToDisplay.length === 1) return null;

  // return countriesToDisplay.map((country) => {
  //   <div key={country.name.official}>
  //     {country.name.common}{' '}
  //     <button onClick={() => setCountriesToDisplay([country])}>show</button>
  //     {console.log('hi')}
  //   </div>;
  // });

  return (
    <ul>
      {countriesToDisplay.map((country) => {
        <li key={country.name.official}>
          {country.name.common}{' '}
          <button onClick={() => setCountriesToDisplay([country])}>show</button>
          {console.log('hi')}
        </li>;
      })}
    </ul>
  );
};

export default Countries;

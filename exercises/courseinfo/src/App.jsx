const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    { part1: 'Fundamentals of React', exercises: 10 },
    { part2: 'Using props to pass data', exercises: 7 },
    { part3: 'State of a component', exercises: 14 }
  ];

  const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    );
  };

  const Content = () => {
    console.log(parts);
    return (
      <>
        <h2>Content:</h2>
        <h3>{parts[0].part1}</h3>
        <p>Number of exercises: {parts[0].exercises}</p>
        <h3>{parts[1].part2}</h3>
        <p>Number of exercises: {parts[1].exercises}</p>
        <h3>{parts[2].part3}</h3>
        <p>Number of exercises: {parts[2].exercises}</p>
      </>
    );
  };
  const Total = () => {
    return (
      <>
        <h3>Total number of exercises:</h3>
        <p>{parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  );
};

export default App;

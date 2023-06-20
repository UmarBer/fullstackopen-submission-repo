const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 }
  ];

  const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    );
  };

  const Part = (props) => {
    console.log(props);
    return (
      <>
        <h3>{props.part}</h3>
        <p>Number of exercises: {props.exercises}</p>
      </>
    );
  };

  const Content = () => {
    console.log(parts);
    return (
      <>
        <h2>Content:</h2>
        <Part part={parts[0].part} exercises={parts[0].exercises} />
        <Part part={parts[1].part} exercises={parts[1].exercises} />
        <Part part={parts[2].part} exercises={parts[2].exercises} />
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

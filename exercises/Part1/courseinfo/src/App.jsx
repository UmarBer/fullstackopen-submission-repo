const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  const Header = (props) => {
    return (
      <>
        <h1>{props.name}</h1>
      </>
    );
  };

  const Part = (props) => {
    return (
      <>
        <h3>{props.name}</h3>
        <p>Number of exercises: {props.exercises}</p>
      </>
    );
  };

  const Content = (props) => {
    console.log(props);
    return (
      <>
        <h2>Content:</h2>
        <Part
          name={course.parts[0].name}
          exercises={course.parts[0].exercises}
        />
        <Part
          name={course.parts[1].name}
          exercises={course.parts[1].exercises}
        />
        <Part
          name={course.parts[2].name}
          exercises={course.parts[2].exercises}
        />
      </>
    );
  };
  const Total = () => {
    return (
      <>
        <h3>Total number of exercises:</h3>
        <p>
          {course.parts[0].exercises +
            course.parts[1].exercises +
            course.parts[2].exercises}
        </p>
      </>
    );
  };

  return (
    <div>
      <Header name={course.name} />
      <Content />
      <Total />
    </div>
  );
};

export default App;

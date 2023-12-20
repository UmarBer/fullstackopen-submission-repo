import React from 'react';

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

  return <h3>total of {sum} exercises</h3>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <ul>
      {course.parts.map((part) => (
        <li key={part.id}>
          <Part part={part} />
        </li>
      ))}
    </ul>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;

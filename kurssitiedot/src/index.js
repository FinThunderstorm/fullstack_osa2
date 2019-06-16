import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const Header = (props) => {
    return(
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Part = (props) => {
    return(
        <>
            <p>{props.part} {props.exercises}</p>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            {props.parts.map(part => {
                return <Part part={part.name} exercises={part.exercises}/>
            })}
        </>
    )
}

const Total = (props) => {
    let yhteensa = 0
    props.parts.forEach(part => {
        yhteensa = yhteensa + part.exercises
    })
    return (
        <>
            <p>yhteensä {yhteensa} tehtävää</p>
        </>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  } 



ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';

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
                return <Part key={part.id} part={part.name} exercises={part.exercises}/>
            })}
        </>
    )
}

const Total = (props) => {
    // logiikka siis se, että annetaan nytille lähtöarvoksi nolla, johon se aina lisää lisayksen tehtavien määrän. (note to myself tulevaisuuteen)
    const yhteensa = props.parts.reduce((nyt, lisays) => {
        return (nyt + lisays.exercises)
    },0)
    return (
        <>
            <p>yhteensä {yhteensa} tehtävää</p>
        </>
    )
}

const Course = (props) => {
    return (
        <>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </>
    )
}

const App = () => {
    const courses = [
        {
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
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
            ]
        }, 
        {
            name: 'Node.js',
            parts: [
            {
                name: 'Routing',
                exercises: 3,
                id: 1
            },
            {
                name: 'Middlewares',
                exercises: 7,
                id: 2
            }
            ]
        }
    ]
  
    const courseselemets = () => courses.map((course,i) => {
        return (
            <Course key={i} course={course}/>
        )
    })
    return (
        <div>
            {courseselemets()}
        </div>
    )
  }



ReactDOM.render(<App />, document.getElementById('root'));
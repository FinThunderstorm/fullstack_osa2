import React from 'react';

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

const Course = (props) => {
    return (
        <>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </>
    )
}

export default Course
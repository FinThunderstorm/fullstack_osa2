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
                return <Part key={part.id} part={part.name} exercises={part.exercises}/>
            })}
        </>
    )
}

const Total = (props) => {
    const reducer = (nyt, lisays) => nyt + lisays
    const yhteensa = props.parts.reduce((nyt, lisays) => {
        console.log("nyt",nyt)
        console.log("lisays",lisays)
        console.log("nyt ",nyt,"lisays ",lisays.exercises)
        return (nyt + lisays.exercises)
    },0)
    console.log("yhteensa ",yhteensa)
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
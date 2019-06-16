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
    //logiikka siis se, että annetaan nytille lähtöarvoksi nolla, johon se aina lisää lisayksen tehtavien määrän. (note to myself tulevaisuuteen)
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

export default Course
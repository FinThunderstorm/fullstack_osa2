import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    var check = persons.find(person => {
      return person.name === personObject.name
    })

    if(check !== undefined){
      alert(`${personObject.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const filterPerson = (event) => {
    event.preventDefault()
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const Filter = (props) => {
    return (
      <form><div>filter shown with <input value={props.filterValue} onChange={props.filterOnChange}/></div></form>
    )
  }

  const PersonForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <div>name: <input value={props.nameValue} onChange={props.nameOnChange}/></div>
        <div>number: <input value={props.numberValue} onChange={props.numberOnChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
  }

  const Persons = (props) => {
    const persons = props.persons
    
    return (
      persons.filter(person => {
        if(newFilter.length > 0){
          const nameLowerCase = person.name.toLowerCase()
          const filter = newFilter.toLowerCase()
          return nameLowerCase.includes(filter)
        } else{
          return true
        }
       }).map((person,i) => <Person key={i} name={person.name} number={person.number} />)
    )
  }

  const Person = (props) => {
    return (
      <div>{props.name} {props.number}</div>
    )
  }

  

  return (
    <div> 
      <h2>Phonebook</h2>
      <Filter onSubmit={filterPerson} filterValue={newFilter} filterOnChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handlePersonChange} numberValue={newNumber} numberOnChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )

}

export default App
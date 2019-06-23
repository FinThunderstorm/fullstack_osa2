import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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
  return (
    props.persons.filter(person => {
      if(props.filter.length > 0){
        const nameLowerCase = person.name.toLowerCase()
        const filter = props.filter.toLowerCase()
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


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
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
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
        setNewNumber('')
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }
  
  

  

  
  

  

  return (
    <div> 
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} filterOnChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handlePersonChange} numberValue={newNumber} numberOnChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )

}

export default App
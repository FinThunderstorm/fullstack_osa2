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
    }).map((person,i) => <Person key={i} name={person.name} number={person.number} removePerson={props.removePerson} id={person.id} />)
  )
}

const Person = (props) => {
  
  return (
    <div>{props.name} {props.number}<button id={props.id} value={props.name} onClick={props.removePerson}>delete</button></div>
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
      .then(initialPersons => {
        setPersons(initialPersons)
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

    console.log(check)

    if(check !== undefined){
      if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
        
        personService
          .update(check.id, personObject)
          .then(person => {
            console.log(person)
            personService
              .getAll()
              .then(updatePersons => {
                setPersons(updatePersons)
              })
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (event) => {
    const name = event.target.value
    if(window.confirm(`Delete ${name}?`)){
      personService
      .remove(event.target.id)
      .then(response => {
        personService
          .getAll()
          .then(updatePersons => {
            setPersons(updatePersons)
          })
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
      <Persons persons={persons} filter={newFilter} removePerson={removePerson}/>
    </div>
  )

}

export default App
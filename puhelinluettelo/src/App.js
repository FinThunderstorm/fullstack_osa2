import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const rows = () => persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handlePersonChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App
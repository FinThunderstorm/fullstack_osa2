import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

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

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }



  const rows = () => persons.filter(person => {
    if(newFilter.length > 0){
      const nameLowerCase = person.name.toLowerCase()
      console.log(person.name," ",nameLowerCase)
      const filter = newFilter.toLowerCase()
      console.log(newFilter," ",filter)
      return nameLowerCase.includes(filter)
    } else{
      return true
    }
   }).map(person => <div key={person.name}>{person.name} {person.number}</div>)
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
      </form>
      <h2>add a new</h2>
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
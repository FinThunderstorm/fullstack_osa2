import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {

  return (
    <div>find countries <input value={props.value} onChange={props.onChange} /></div>
  )
}

const Countries = (props) => {
  const filteredCountries = props.countries.filter(country => {
    if(props.filter.length > 0){
      const nameLowerCase = country.name.toLowerCase()
      const filter = props.filter.toLowerCase()
      return nameLowerCase.includes(filter)
    } else{
      return true
    }
  })

  if(filteredCountries.length>10){
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if(filteredCountries.length === 1){
    return (
      filteredCountries.map((country,i) => <CountryFact key={i} country={country} />)
    )
  } else{
    return (
      filteredCountries.map((country,i) => <CountryList key={i} name={country.name} />)
    )
  }

  
}

const CountryList = (props) => {
  return (
    <div>{props.name}</div>
  )
}

const CountryFact = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.country.name}</h1>
      <div>capital {props.country.capital}</div>
      <div>population {props.country.population}</div>
      <h2>languages</h2>
      <ul>
        {props.country.languages.map((language,i) => <li key={i}>{language.name}</li>)}
      </ul>
      <img src={props.country.flag} width="30%"/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  },[])

  return (
    <>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countries} filter={newFilter}/>
    </>
  )
}

export default App;

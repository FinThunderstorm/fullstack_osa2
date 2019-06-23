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
  
  
  

  const handleShow = (event) => {
    event.preventDefault()
    

  }
  console.log("countries props",props)

  if(filteredCountries.length>10){
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if(filteredCountries.length === 1){
    return (
      filteredCountries.map((country,i) => <Country key={i} country={country} mode={"fact"} onClick={handleShow}/>)
    )
  } else{
    return (
      filteredCountries.map((country,i) => <Country key={i} country={country} mode={"list"} onClick={handleShow} />)
    )
  }

  
}

const Country = (props) => {
  
  useEffect(() => {
    axios
      .get('https://api.apixu.com/v1/current.json?key=5cdfeca6bf4f43bc969111500192306&q='+props.country.capital)
      .then(response => {
        setWeather(response.data)
      })
  },[])

  console.log("country props",props)
  if(props.mode === "fact"){
    return (
      <div>
        <h1>{props.country.name}</h1>
        <div>capital {props.country.capital}</div>
        <div>population {props.country.population}</div>
        <h2>languages</h2>
        <ul>
          {props.country.languages.map((language,i) => <li key={i}>{language.name}</li>)}
        </ul>
        <img src={props.country.flag} width="30%" alt=""/>
      </div>
    )
  } else if(props.mode === "list"){
    return (
      <div>{props.country.name}<button id={props.country.name} onClick={props.onClick}>show</button></div>
    )
  }
  
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
        console.log("response.data",response.data)
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

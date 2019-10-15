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
  
  console.log("countries props",props)

  if(filteredCountries.length>10){
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if(filteredCountries.length === 1){
    return (
      filteredCountries.map((country,i) => <Country key={i} country={country} mode={"fact"} nayta={'yksi'}/>)
    )
  } else{
    return (
      filteredCountries.map((country,i) => <Country key={i} country={country} mode={"list"} nayta={'monta'} />)
    )
  }

  
}

const Country = (props) => {
  const placeholderWeather = {
    current: {
      temperature: '',
      weather_icons: {
        0: ''
      },
      wind_speed: '',
      wind_dir: ''
    }
  }
  const [ weather, setWeather ] = useState(placeholderWeather)
  useEffect(() => {
    const params = {
      access_key: '19b5ea141a9dc1f924a4f886e1a1b333',
      query: props.country.capital
    }
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }, [])

  

  const [ visible, setVisble ] = useState(false)
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisble(!visible)
  }

  /*useEffect(() => {
    if(props.nayta === 'monta'){
      setVisble(!visible)
    }
  },[])*/
  

  console.log("country props",props)
  if(props.mode === "fact"){
    return (
      <div style={showWhenVisible}>
        <h1>{props.country.name}</h1>
        <div>capital {props.country.capital}</div>
        <div>population {props.country.population}</div>
        <h2>languages</h2>
        <ul>
          {props.country.languages.map((language,i) => <li key={i}>{language.name}</li>)}
        </ul>
        <img src={props.country.flag} width="30%" alt=""/>
        <h1>Weather in {props.country.capital}</h1>
        <div><b>temperature: {weather.current.temperature} Celsius</b></div>
        <img src={weather.current.weather_icons[0]} width='30%' alt="" />
        <div><b>wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}</b></div>
      </div>
    )
  } else if(props.mode === "list"){
    return (
      <div>
        <div style={hideWhenVisible}>{props.country.name}<button id={props.country.name} onClick={toggleVisibility}>show</button></div>
        <div style={showWhenVisible}>
          <h1>{props.country.name}</h1>
          <div>capital {props.country.capital}</div>
          <div>population {props.country.population}</div>
          <h2>languages</h2>
          <ul>
            {props.country.languages.map((language,i) => <li key={i}>{language.name}</li>)}
          </ul>
          <img src={props.country.flag} width="30%" alt=""/>
          <h1>Weather in {props.country.capital}</h1>
          <div><b>temperature: {weather.current.temperature} Celsius</b></div>
          <img src={weather.current.weather_icons[0]} width='30%' alt="" />
          <div><b>wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}</b></div>
        </div>
      </div>
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

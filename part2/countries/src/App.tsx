import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Filter from './components/Filter'
import CountriesDisplay, { ICountryData } from './components/CountriesDisplay'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState<ICountryData[] | []>([])
  const [country, setCountry] = useState<ICountryData>()

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(undefined)
    setFilter(e.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <CountriesDisplay filter={filter} countries={countries} country={country} setCountry={setCountry} />
    </div>
  )
}

export default App;

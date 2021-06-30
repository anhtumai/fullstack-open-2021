import React, { useState, useEffect } from 'react'
import axios from 'axios'

import People from './components/People'
import PersonForm, { IPerson } from './components/Form'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState<IPerson[] | []>([])
  useEffect(() => {
    if (persons.length === 0) {
      axios
        .get('http://localhost:3001/persons').then(response => {
          setPersons(response.data)
        })
    }
  })

  const [filter, setFilter] = useState('')

  const handleSubmit = (submittedPerson: IPerson) => {
    if (persons.filter(person => person.name === submittedPerson.name).length > 0) {
      alert(`${submittedPerson.name} is already added to phonebook`)
      return
    }
    const copiedPersons = [...persons]
    copiedPersons.push(submittedPerson)
    setPersons(copiedPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={(e) => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <People people={persons} filter={filter} />
    </div>
  )
}

export default App
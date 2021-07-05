import React, { useState, useEffect } from "react";
import axios from "axios";

import People from "./components/People";
import PersonForm, { IFormInfo } from "./components/Form";
import Filter from "./components/Filter";

export interface IPerson {
  name: string;
  number: string;
  id: number;
}

const App = () => {
  const [persons, setPersons] = useState<IPerson[] | []>([]);
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [filter, setFilter] = useState("");

  const displayedPeople = persons.filter((person) =>
    person.name.includes(filter.trim())
  );

  const handleSubmit = (submittedPerson: IFormInfo) => {
    if (
      persons.filter((person) => person.name === submittedPerson.name).length >
      0
    ) {
      alert(`${submittedPerson.name} is already added to phonebook`);
      return;
    }
    const copiedPersons = [...persons];
    copiedPersons.push({ ...submittedPerson, id: copiedPersons.length + 1 });
    setPersons(copiedPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={(e) => setFilter(e.target.value)} />
      <PersonForm handleSubmit={handleSubmit} />
      <People people={displayedPeople} />
    </div>
  );
};

export default App;

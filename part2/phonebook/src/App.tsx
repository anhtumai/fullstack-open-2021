import React, { useState, useEffect } from "react";
import axios from "axios";

import People from "./components/People";
import PersonForm, { IFormInfo } from "./components/Form";
import Filter from "./components/Filter";

import { getAllPeople, create } from "./services/persons";

export interface IPerson {
  name: string;
  number: string;
  id: number;
}

const App = () => {
  const [persons, setPersons] = useState<IPerson[]>([]);
  useEffect(() => {
    getAllPeople().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const [filter, setFilter] = useState("");

  const displayedPeople = persons.filter((person) =>
    person.name.includes(filter.trim())
  );

  const handleSubmit = (submittedPersonInfo: IFormInfo) => {
    if (
      persons.filter((person) => person.name === submittedPersonInfo.name)
        .length > 0
    ) {
      alert(`${submittedPersonInfo.name} is already added to phonebook`);
      return;
    }
    create(submittedPersonInfo).then((newPerson: IPerson) => {
      setPersons(persons.concat(newPerson));
    });
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

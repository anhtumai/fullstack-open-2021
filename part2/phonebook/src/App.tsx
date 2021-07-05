import React, { useState, useEffect } from "react";
import axios from "axios";

import People from "./components/People";
import PersonForm, { IFormInfo } from "./components/Form";
import Filter from "./components/Filter";

import { getAllPeople, createPerson, deletePerson } from "./services/persons";

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
    if (persons.some((person) => person.name === submittedPersonInfo.name)) {
      alert(`${submittedPersonInfo.name} is already added to phonebook`);
      return;
    }
    createPerson(submittedPersonInfo).then((newPerson: IPerson) => {
      setPersons(persons.concat(newPerson));
    });
  };

  const handleDelete = (id: number) => {
    const deletedPerson = persons.find((person) => person.id === id);
    if (deletedPerson === undefined) return;
    const deleteAccepted = window.confirm(`Delete ${deletedPerson.name} ?`);
    if (!deleteAccepted) return;
    deletePerson(id).then((_) => {
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={(e) => setFilter(e.target.value)} />
      <PersonForm handleSubmit={handleSubmit} />
      <People people={displayedPeople} onDeletePerson={handleDelete} />
    </div>
  );
};

export default App;

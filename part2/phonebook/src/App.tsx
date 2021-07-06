import { useState, useEffect } from "react";

import People from "./components/People";
import PersonForm, { IFormInfo } from "./components/Form";
import Filter from "./components/Filter";

import {
  getAllPeople,
  createPerson,
  deletePerson,
  updatePerson,
} from "./services/persons";

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

  const updatePersonsById = (id: number, info: IFormInfo) => {
    updatePerson(id, info).then((updatedPerson) => {
      const newPersons = persons.map((person) =>
        person.id === id ? updatedPerson : person
      );
      setPersons(newPersons);
    });
  };

  const handleSubmit = (submittedPersonInfo: IFormInfo) => {
    const submittedPerson = persons.find(
      (person) => person.name === submittedPersonInfo.name
    );
    if (submittedPerson !== undefined) {
      const updateAccepted = window.confirm(
        `${submittedPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (updateAccepted)
        updatePersonsById(submittedPerson.id, submittedPersonInfo);
    } else {
      createPerson(submittedPersonInfo).then((newPerson: IPerson) => {
        setPersons(persons.concat(newPerson));
      });
    }
  };

  const handleDelete = (id: number) => {
    const deletedPerson = persons.find((person) => person.id === id);
    if (deletedPerson === undefined) return;
    const deleteAccepted = window.confirm(`Delete ${deletedPerson.name} ?`);
    if (!deleteAccepted) return;
    deletePerson(id).then((_) => {
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
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

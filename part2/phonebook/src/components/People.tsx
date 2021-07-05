import { IPerson } from "../App";

interface IPersonProps {
  person: IPerson;
  onDeletePerson(id: number): void;
}

interface IPeopleProps {
  people: IPerson[];
  onDeletePerson(id: number): void;
}

const Person = ({ person, onDeletePerson }: IPersonProps) => (
  <div>
    <p>
      {person.name} {person.number}
    </p>
    <button onClick={() => onDeletePerson(person.id)}>delete</button>
  </div>
);

const People = ({ people, onDeletePerson }: IPeopleProps) => {
  return (
    <div>
      <h3>Numbers</h3>
      {people.map((person) => (
        <Person
          key={person.id}
          person={person}
          onDeletePerson={onDeletePerson}
        />
      ))}
    </div>
  );
};

export default People;

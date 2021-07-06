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
    <span>{person.name}</span>
    &nbsp;
    <span>{person.number}</span>
    &nbsp;
    <button onClick={() => onDeletePerson(person.id)}>Delete</button>
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

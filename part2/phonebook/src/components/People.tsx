import { IPerson } from "../App";

interface IPersonProps {
  name: string;
  number: string;
}

interface IPeopleProps {
  people: IPerson[];
}

const Person = ({ name, number }: IPersonProps) => (
  <div>
    <p>
      {name} {number}
    </p>
    <button>delete</button>
  </div>
);

const People = ({ people }: IPeopleProps) => {
  return (
    <div>
      <h3>Numbers</h3>
      {people.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default People;


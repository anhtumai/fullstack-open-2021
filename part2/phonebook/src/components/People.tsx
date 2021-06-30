interface IPersonProps {
    name: string
    number: string
}

interface IPeopleProps {
    people: IPersonProps[]
    filter: string
}

const Person = ({ name, number }: IPersonProps) => (
    <p>{name} {number}</p>
)

const People = ({ people, filter }: IPeopleProps) => {

    const displayedPeople = (filter.trim() === "") ? people : people.filter(person => person.name.includes(filter.trim()))

    return (
        <div>
            {displayedPeople.map(person => (<Person name={person.name} number={person.number} />))}
        </div>
    )
}

export default People;
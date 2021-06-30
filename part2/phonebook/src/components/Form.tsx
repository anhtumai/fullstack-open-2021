import React, { useState } from 'react';

export interface IPerson {
    name: string;
    number: string;
}


interface IPersonFormProps {
    handleSubmit(submittedPerson: IPerson): void;
}


const PersonForm = ({ handleSubmit }: IPersonFormProps) => {

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const resetInputFields = () => {
        setName('')
        setNumber('')
    }

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        handleSubmit(submittedPerson)
        resetInputFields()
    }

    const submittedPerson = { name: name.trim(), number: number.trim() }

    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={name} onChange={(e) => setName(e.target.value)} />
                number: <input value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form >
    )
}

export default PersonForm
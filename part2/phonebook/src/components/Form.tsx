import React, { useState } from "react";

export interface IFormInfo {
  name: string;
  number: string;
}

interface IPersonFormProps {
  handleSubmit(submittedPerson: IFormInfo): void;
}

const PersonForm = ({ handleSubmit }: IPersonFormProps) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const resetInputFields = () => {
    setName("");
    setNumber("");
  };

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleSubmit(submittedPerson);
    resetInputFields();
  };

  const submittedPerson = { name: name.trim(), number: number.trim() };

  return (
    <>
      <h3>Add a new:</h3>
      <form onSubmit={onSubmit}>
        <div>
          <p>name: </p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <p>number: </p>
          <input value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;


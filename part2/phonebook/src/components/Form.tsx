import React, { useState } from "react";

import InputWithLabel from "./InputWithLabel";

export interface IFormInfo {
  name: string;
  number: string;
}

interface IPersonFormProps {
  handleSubmit(submittedInfo: IFormInfo): void;
}

const PersonForm = ({ handleSubmit }: IPersonFormProps) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const resetInputFields = () => {
    setName("");
    setPhoneNumber("");
  };

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleSubmit(submittedInfo);
    resetInputFields();
  };

  const submittedInfo = { name, number: phoneNumber };

  return (
    <>
      <h3>Add a new:</h3>
      <form onSubmit={onSubmit}>
        <InputWithLabel
          htmlFor="name"
          value={name}
          onInputChange={(e) => setName(e.target.value)}
        >
          <span>name:</span>
        </InputWithLabel>
        <br />
        <InputWithLabel
          htmlFor="number"
          value={phoneNumber}
          onInputChange={(e) => setPhoneNumber(e.target.value)}
        >
          <span>number:</span>
        </InputWithLabel>{" "}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;

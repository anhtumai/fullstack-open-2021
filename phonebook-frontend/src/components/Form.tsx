import React, { useState } from "react";

import InputWithLabel from "./InputWithLabel";

export interface IFormInfo {
  name: string;
  number: string;
}

interface IPersonFormProps {
  handleSubmit(submittedInfo: IFormInfo): void;
}

/**
 * Phone number is valid if it only contains digit and '-'.
 * '-' must also be surrounded by digits
 *
 * @param {string} phoneNumber
 * @returns {boolean}
 */
function validatePhoneNumber(phoneNumber: string): boolean {
  // if (phoneNumber.length < 8 || phoneNumber.length >= 16) return false;
  for (let i = 0; i < phoneNumber.length; i++) {
    const c = phoneNumber[i];
    if ((c < "0" || c > "9") && c !== "-") return false;
    if (i > 0 && c === "-" && phoneNumber[i - 1] === "-") return false;
  }
  if (phoneNumber[0] === "-" || phoneNumber.slice(-1) === "-") return false;
  return true;
}

/**
 * Check submitted name is valid
 *
 * @param {string} name
 * @returns {boolean}
 */
function validateName(name: string): boolean {
  return name.length > 0;
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
    if (validatePhoneNumber(phoneNumber) && validateName(name)) {
      const submittedInfo = { name, number: phoneNumber };
      handleSubmit(submittedInfo);
    } else {
      alert(`Submitted phone number or name is not valid`);
    }
    resetInputFields();
  };

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

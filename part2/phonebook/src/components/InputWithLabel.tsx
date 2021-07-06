import React from "react";

interface IInputWithLabelProps {
  htmlFor: string;
  value: string;
  children: React.ReactNode;
  onInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const InputWithLabel = ({
  htmlFor,
  children,
  value,
  onInputChange,
}: IInputWithLabelProps) => {
  return (
    <>
      <label htmlFor={htmlFor}>{children}</label>
      <input id={htmlFor} type="text" value={value} onChange={onInputChange} />
    </>
  );
};

export default InputWithLabel;

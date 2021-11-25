const Input = ({ text, name, field }) => {
  return (
    <div>
      <span>{text}</span>
      <input
        type={field.type}
        name={name}
        value={field.value}
        onChange={field.onChange}
      />
    </div>
  );
};

export default Input;

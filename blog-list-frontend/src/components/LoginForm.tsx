import React from "react";
import PropType from "prop-types";

interface ILoginFormProps {
  handleSubmit(event: React.SyntheticEvent): Promise<void>;
  handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void;
  handlePassworChange(event: React.ChangeEvent<HTMLInputElement>): void;
  username: string;
  password: string;
}

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePassworChange,
  username,
  password,
}: ILoginFormProps) => {
  return (
    <div>
      <h2>login to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            data-testid="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={handlePassworChange}
          />
        </div>
        <button data-testid="login-butn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropType.func.isRequired,
  handleUsernameChange: PropType.func.isRequired,
  handlePassworChange: PropType.func.isRequired,
  username: PropType.string.isRequired,
  password: PropType.string.isRequired,
};

export default LoginForm;

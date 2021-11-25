import PropTypes from "prop-types";

const LoginBanner = ({
  name,
  handleLogout,
}: {
  name: string;
  handleLogout(): void;
}) => {
  return (
    <p>
      {name} logged in &nbsp;
      <button type="button" onClick={handleLogout}>
        <small>logout</small>
      </button>
    </p>
  );
};

LoginBanner.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default LoginBanner;

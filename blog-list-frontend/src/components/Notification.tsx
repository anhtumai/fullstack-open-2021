import PropTypes from "prop-types";

interface INotificationProps {
  message: string | null;
  state: "error" | "success";
}

const Notification = ({ message, state }: INotificationProps) => {
  if (message === null) return null;

  return <div className={state}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: null,
};

export default Notification;

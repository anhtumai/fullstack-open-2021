interface INotificationProps {
  message: string | null;
}

const Notification = ({ message }: INotificationProps) => {
  if (message === null) return null;

  return <div className="success">{message}</div>;
};

export default Notification;

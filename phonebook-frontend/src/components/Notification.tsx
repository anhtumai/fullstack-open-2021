interface INotificationProps {
  message: string | null;
  state: "error" | "success";
}

const Notification = ({ message, state }: INotificationProps) => {
  if (message === null) return null;

  return <div className={state}>{message}</div>;
};

export default Notification;

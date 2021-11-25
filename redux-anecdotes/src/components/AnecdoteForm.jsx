import { connect } from "react-redux";
import { createAddAnecdoteAction } from "../reducers/anecdoteReducer";
import { createSetNotificationAction } from "../reducers/notificationReducer";

const AnecdoteForm = ({ addAnecdote, setNotification }) => {
  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (event.target.anecdote.value === "") {
      alert("Empty anecdote is not permitted");
      return;
    }
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    addAnecdote(content);
    setNotification(`you created '${content}'`);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleFormSubmission}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addAnecdote: createAddAnecdoteAction,
  setNotification: createSetNotificationAction,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);

import { useEffect } from "react";
import { connect } from "react-redux";
import { createUpdateVoteAction } from "../reducers/anecdoteReducer";
import { createSetNotificationAction } from "../reducers/notificationReducer";

const AnecdoteList = ({ anecdotes, filter, updateVote, setNotification }) => {
  useEffect(() => {});

  const sortedAnecdotes = anecdotes
    .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
    .sort((a, b) => b.votes - a.votes);

  const vote = (anecdote) => {
    updateVote(anecdote);
    setNotification(`you voted '${anecdote.content}'`);
  };

  return (
    <div>
      {" "}
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  updateVote: createUpdateVoteAction,
  setNotification: createSetNotificationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);

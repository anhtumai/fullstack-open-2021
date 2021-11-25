import anecdoteService from "../services/anecdoteService";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "VOTE":
      const updatedAnecdote = action.data;
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const createUpdateVoteAction = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(anecdote);
    dispatch({ type: "VOTE", data: updatedAnecdote });
  };
};

export const createAddAnecdoteAction = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const createInitializeAnecdotesAction = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;

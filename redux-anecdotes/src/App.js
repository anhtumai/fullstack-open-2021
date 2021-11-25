import React, { useEffect } from "react";

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

import { createInitializeAnecdotesAction } from "./reducers/anecdoteReducer";

import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createInitializeAnecdotesAction());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;

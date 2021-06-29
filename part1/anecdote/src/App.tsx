import React, { useState } from 'react'

interface HeaderType {
  title: string
}

interface ButtonType {
  name: string,
  handleClick: () => void
}

interface AnecdoteType {
  text: string
  vote: number
}

const Header = ({ title }: HeaderType) => (
  <h1>{title}</h1>
);

const Button = ({ name, handleClick }: ButtonType) => (
  <button onClick={handleClick}>{name}</button>
)

const Anecdote = ({ text, vote }: AnecdoteType) => (
  <div>
    <p>{text}</p>
    <p>has {vote} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const increaseSelected = () => { if (selected < anecdotes.length - 1) setSelected(selected + 1) }
  const increaseVote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }
  console.log(votes, typeof votes)

  const maxIndex = votes.reduce((res: number, vote: number, i: number) => (vote > votes[res] ? i : res), 0);

  return (
    <div>
      <Header title="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} vote={votes[selected]} />
      <div>
        <Button name="vote" handleClick={increaseVote} />
        <Button name="next anecdote" handleClick={increaseSelected} />
      </div>

      <Header title="Anecdote with most votes" />
      <Anecdote text={anecdotes[maxIndex]} vote={votes[maxIndex]} />
    </div>
  )
}

export default App
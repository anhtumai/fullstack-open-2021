import React, { useState } from 'react'

interface HeaderType {
  title: string
}

interface ButtonType {
  name: string,
  handleClick: () => void
}

interface StatisticType {
  text: string
  value: number | string
}
interface StatisticsType {
  good: number
  bad: number
  neutral: number
}

const Header = ({ title }: HeaderType) => (
  <h1>{title}</h1>
);

const Button = ({ name, handleClick }: ButtonType) => (
  <button onClick={handleClick}>{name}</button>
)

const Statistic = ({ text, value }: StatisticType) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
)

const Statistics = ({ good, neutral, bad }: StatisticsType) => {

  const total = good + neutral + bad;

  if (total === 0) return (
    <div>No feedback given</div>
  )

  const average = (good - bad) / total;
  const positive = (good / total * 100).toString() + ' %'
  return (
    <table>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={total} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive} />
    </table>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <Header title="give feedback" />
      <div id="feedback">
        <Button name="good" handleClick={increaseGood} />
        <Button name="neutral" handleClick={increaseNeutral} />
        <Button name="bad" handleClick={increaseBad} />
      </div>
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
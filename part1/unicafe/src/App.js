import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const Statistics = ({props}) => {
  const {good, neutral, bad} = props;
  const all = good + neutral + bad;
  if (good === 0 && neutral === 0 && bad === 0) return <div>No feedback given</div>;

  return (
    <>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={(good - bad) / all}/>
      <StatisticLine text='positive' value={`${good / all * 100}% `}/>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={'good'}/>
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button onClick={() => setBad(bad + 1)} text={'bad'}/>
      <h1>statistics</h1>
      <Statistics props={{good, neutral, bad}}/>
    </div>
  )
}

export default App

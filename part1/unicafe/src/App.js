import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = ({text, counter}) => (
  <tr>
    <td>{text}</td>
    <td>{counter}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  if ((good | neutral | bad) > 0) {
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={good + neutral + bad} />
            <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)} />
            <StatisticLine text='positive ' value={`${(good / (good + neutral + bad)) * 100} %`} />
          </tbody>
        </table>
      </>
    )
  }
  return (
    <h3>No feedback given</h3>
  )
}
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
              
    const upGoodByOne = () => setGood(good + 1)
    const upNeutralByOne = () => setNeutral(neutral + 1)
    const upBadByOne = () => setBad(bad + 1)
    return (
        <div>
          <h1>give feedback</h1>
          <Button onClick={upGoodByOne} text='good' />
          <Button onClick={upNeutralByOne} text='neutral' />
          <Button onClick={upBadByOne} text='bad' />
          <h1>statistics</h1>
          <>{Statistics({ good, neutral, bad })}</>
        </div>
    )
}
   
export default App

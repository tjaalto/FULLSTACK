import { useState } from 'react'

const Header = () => <h1>Anecdote of the day</h1>
const Anecdote = ({text, voteCount}) => (
  <div>
    <p>{text}</p>
    <p>has {voteCount} votes</p>
  </div>
)

const Button = ({handleClick, text}) => {
  return
    ( <button onClick={handleClick}>{text}</button>
)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy)
  }

  const randomValue = () => Math.floor(Math.random() * anecdotes.length)

  const handleNext = () => setSelected(randomValue)

  const mostVoted = () => votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} voteCount={votes[selected]}/>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNext} text="next anecdote" />
      
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[mostVoted()]} voteCount={votes[mostVoted()]}/>
    </div>
  )
}

export default App

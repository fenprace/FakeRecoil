import React from 'react'
import { useRecoilState } from '../../../src'
import { countIII } from '../selectors'

const CounterIII: React.FC = () => {
  const [count, setCount] = useRecoilState(countIII)
  console.log('<CounterIII /> was Re-rendered!')
  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => setCount(count - 1)}>Dec</button>
    </>
  )
}

export default CounterIII

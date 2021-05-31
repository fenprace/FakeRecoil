import React from 'react'
import { useRecoilState } from '../../../src'
import { countI } from '../atoms'
import Inc from './Inc'

const CounterI: React.FC = () => {
  const [count, setCount] = useRecoilState(countI)
  console.log('<CounterI /> was Re-rendered!')
  return (
    <>
      <h2>{count}</h2>
      <Inc atom={countI} />
      <button onClick={() => setCount(count - 1)}>Dec</button>
    </>
  )
}

export default CounterI

import React from 'react'
import { useRecoilState, useResetRecoilState } from '../../../src'
import { countI } from '../atoms'
import Inc from './Inc'

const CounterI: React.FC = () => {
  const [count, setCount] = useRecoilState(countI)
  const reset = useResetRecoilState(countI)

  console.log('<CounterI /> was Re-rendered!')
  return (
    <>
      <h2>{count}</h2>
      <button onClick={reset}>Reset</button>
      <Inc atom={countI} />
      <button onClick={() => setCount(count - 1)}>Dec</button>
    </>
  )
}

export default CounterI

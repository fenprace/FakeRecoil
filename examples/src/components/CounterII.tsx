import React from 'react'
import { useRecoilValue, useResetRecoilState } from '../../../src'
import { countII } from '../atoms'

const CounterII: React.FC = () => {
  const count = useRecoilValue(countII)
  const reset = useResetRecoilState(countII)

  console.log('<CounterII /> was Re-rendered!')
  return (
    <>
      <h2>{count}</h2>
      <button onClick={reset}>Reset</button>
    </>
  )
}

export default CounterII

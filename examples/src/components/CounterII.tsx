import React from 'react'
import { useRecoilValue } from '../../../src'
import { countII } from '../atoms'

const CounterII: React.FC = () => {
  const count = useRecoilValue(countII)
  console.log('<CounterII /> was Re-rendered!')
  return <h2>{count}</h2>
}

export default CounterII

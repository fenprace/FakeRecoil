import React from 'react'
import { useRecoilValue } from '../../src'

interface CounterProps {
  atom: any
}

const Counter = ({ atom }: CounterProps) => {
  const count = useRecoilValue(atom)
  console.log(`<Counter ${atom.key} /> was Re-rendered!`)
  return <h2>{count}</h2>
}

export default Counter

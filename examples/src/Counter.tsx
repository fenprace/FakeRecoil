import React from 'react'
import { useRecoilState } from '../../src'

interface CounterProps {
  atom: any
}

const Counter = React.memo<CounterProps>(({ atom }) => {
  const [count] = useRecoilState(atom)
  console.log(`<Counter ${atom.key} /> was Re-rendered!`)
  return <h2>{count}</h2>
})

export default Counter

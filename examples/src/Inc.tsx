import React from 'react'
import { useRecoilState } from '../../src'

interface IncProps {
  atom: any
}

const Inc = React.memo<IncProps>(({ atom }) => {
  const [count, setCount] = useRecoilState(atom)
  console.log(`<Inc ${atom.key} /> was Re-rendered!`)
  return <button onClick={() => setCount(count + 1)}>Inc</button>
})

export default Inc

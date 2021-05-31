import React from 'react'
import { useRecoilState } from '../../../src'
import { Atom } from '../../../src/atom'

interface IncProps {
  atom: Atom<number>
}

const Inc = React.memo(({ atom }: IncProps) => {
  const [count, setCount] = useRecoilState(atom)
  console.log(`<Inc ${atom.key} /> was Re-rendered!`)
  return <button onClick={() => setCount(count + 1)}>Inc</button>
})

Inc.displayName = 'Inc'

export default Inc

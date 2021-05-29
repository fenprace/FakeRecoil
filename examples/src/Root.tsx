import React from 'react'
import * as atoms from './atoms'
import * as selectors from './selectors'
import Counter from './Counter'
import { useRecoilState } from '../../src'
import Inc from './Inc'

const Root = () => {
  const [countI, setCountI] = useRecoilState(atoms.countI)
  console.log(`<Root /> was Re-rendered!`)
  return (
    <>
      <h1>FakeRecoil</h1>
      <Counter atom={atoms.countI} />
      <Inc atom={atoms.countI} />
      <button onClick={() => setCountI(countI - 1)}>Dec</button>

      <Counter atom={atoms.countII} />
      <Inc atom={atoms.countII} />

      <Counter atom={selectors.countIII} />
    </>
  )
}

export default Root

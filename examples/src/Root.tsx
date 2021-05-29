import React from 'react'
import { useRecoilState, useSetRecoilState } from '../../src'
import * as atoms from './atoms'
import Counter from './Counter'
import Inc from './Inc'
import * as selectors from './selectors'

const Root = () => {
  const [countI, setCountI] = useRecoilState(atoms.countI)
  const setCountIII = useSetRecoilState(selectors.countIII)
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
      <button onClick={() => setCountIII(countI - 1)}>Dec</button>
    </>
  )
}

export default Root

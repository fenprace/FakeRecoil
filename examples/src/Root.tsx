import React from 'react'
import * as atoms from './atoms'
import CounterI from './components/CounterI'
import CounterII from './components/CounterII'
import CounterIII from './components/CounterIII'
import Inc from './components/Inc'

const Root: React.FC = () => {
  console.log('<Root /> was Re-rendered!')
  return (
    <>
      <h1>FakeRecoil</h1>

      <CounterI />

      <CounterII />
      <Inc atom={atoms.countII} />

      <CounterIII />
    </>
  )
}

export default Root

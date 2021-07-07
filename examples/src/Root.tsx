import React from 'react'
import CounterI from './components/CounterI'
import CounterII from './components/CounterII'
import CounterIII from './components/CounterIII'

interface RootProps {
  children: React.ReactNode
}

const Root: React.FC<RootProps> = ({ children }: RootProps) => {
  console.log('<Root /> was Re-rendered!')
  return (
    <>
      <h1>FakeRecoil</h1>
      <CounterI />

      <CounterII />
      {children}

      <CounterIII />
    </>
  )
}

export default Root

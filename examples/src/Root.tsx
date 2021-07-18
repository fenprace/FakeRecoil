import React from 'react'
import { useRecoilValue, atom, selector } from '../../src'
import { useRecoilState, useSetRecoilState } from '../../src/hooks'

const AtomI = atom({
  key: 'I',
  default: 1,
})

const SelectorII = selector<number>({
  key: 'II',
  get: ({ get }) => get(AtomI) + 1,
  set: ({ set }, value) => {
    set(AtomI, value - 1)
  },
})

const SelectorIV = selector<number>({
  key: 'IV',
  get: ({ get }) => {
    console.log('SelectorIV is computed!')
    return get(SelectorII) + 1
  },
})

const ChildI: React.FC = () => {
  const value = useRecoilValue(AtomI)
  console.log('<ChildI /> was rendered!')
  return <li>{value}</li>
}

const ChildII: React.FC = () => {
  const value = useRecoilValue(SelectorII)
  console.log('<ChildII /> was rendered!')
  return <li>{value}</li>
}

const ChildIII: React.FC = () => {
  const [value, setValue] = useRecoilState(SelectorII)

  const dec = () => {
    setValue(v => v - 1)
  }

  console.log('<ChildIII /> was rendered!')

  return (
    <li>
      {value}
      <button onClick={dec}>Decrement</button>
    </li>
  )
}

const ChildIV: React.FC = () => {
  const value = useRecoilValue(SelectorIV)
  console.log('<ChildIV /> was rendered!')
  return <li>{value}</li>
}

const Root: React.FC = () => {
  console.log('<Root /> was rendered!')
  const set = useSetRecoilState(AtomI)

  return (
    <>
      <h1>FakeRecoil</h1>
      <button onClick={() => set(v => v + 1)}>Increment</button>
      <ul>
        <ChildI />
        <ChildII />
        <ChildIII />
        <ChildIV />
      </ul>
    </>
  )
}

export default Root

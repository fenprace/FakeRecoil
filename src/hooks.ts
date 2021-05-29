import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Atom } from './atom'
import { Selector } from './selector'
import store, { State } from './store'

export const getRecoilAtom = ({ key }: Atom) => {
  return useSelector<State>(state => state[key])
}

export const setRecoilAtom = ({ key }: Atom) => {
  return useCallback(
    newValue => {
      store.dispatch({ type: 'SET_ATOM', payload: { key, value: newValue } })
    },
    [key],
  )
}

export const getRecoilSelecor = ({ key }: Selector) => {
  return useSelector<State>(state => state[key])
}

export const useRecoilValue = (recoilValue: Atom | Selector) => {
  if (recoilValue instanceof Atom) return getRecoilAtom(recoilValue)
  return getRecoilSelecor(recoilValue)
}

export const useRecoilState = (recoilValue: Atom | Selector) => {
  if (recoilValue instanceof Atom)
    return [getRecoilAtom(recoilValue), setRecoilAtom(recoilValue)]
  return [getRecoilSelecor(recoilValue), undefined]
}

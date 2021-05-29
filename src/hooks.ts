import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Atom } from './atom'
import { RecoilValue } from './index'
import { Selector } from './selector'
import store, { State } from './store'

type SetRecoilValueFunction = (newValue: any) => void

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

export const setRecoilSelector = ({ setUpstreamValue }: Selector) => {
  return useCallback(newValue => {
    setUpstreamValue(newValue)
  }, [])
}

export const useRecoilValue = (recoilValue: RecoilValue) => {
  if (recoilValue instanceof Atom) return getRecoilAtom(recoilValue)
  return getRecoilSelecor(recoilValue)
}

export const useSetRecoilState = (recoilValue: RecoilValue) => {
  if (recoilValue instanceof Atom) return setRecoilAtom(recoilValue)
  return setRecoilSelector(recoilValue)
}

export const useRecoilState = (
  recoilValue: RecoilValue,
): [any, SetRecoilValueFunction] => {
  if (recoilValue instanceof Atom)
    return [getRecoilAtom(recoilValue), setRecoilAtom(recoilValue)]
  return [getRecoilSelecor(recoilValue), setRecoilSelector(recoilValue)]
}

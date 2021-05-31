import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Atom } from './atom'
import { RecoilValue } from './index'
import { Selector } from './selector'
import store, { State } from './store'

type SetRecoilValueFunction = (newValue: any) => void

export const getRecoilAtom = <T>({ key }: Atom<T>) => {
  return useSelector<State<any>>(state => state[key])
}

export const setRecoilAtom = <T>({ key }: Atom<T>) => {
  return useCallback(
    newValue => {
      store.dispatch({ type: 'SET_ATOM', payload: { key, value: newValue } })
    },
    [key],
  )
}

export const getRecoilSelecor = <T>({ key }: Selector<T>) => {
  return useSelector<State<any>>(state => state[key])
}

export const setRecoilSelector = <T>({ setUpstreamValue }: Selector<T>) => {
  return useCallback(newValue => {
    setUpstreamValue(newValue)
  }, [])
}

export const useRecoilValue = <T>(recoilValue: RecoilValue<T>) => {
  if (recoilValue instanceof Atom) return getRecoilAtom(recoilValue)
  return getRecoilSelecor(recoilValue)
}

export const useSetRecoilState = <T>(recoilValue: RecoilValue<T>) => {
  if (recoilValue instanceof Atom) return setRecoilAtom(recoilValue)
  return setRecoilSelector(recoilValue)
}

export const useRecoilState = <T>(
  recoilValue: RecoilValue<T>,
): [any, SetRecoilValueFunction] => {
  if (recoilValue instanceof Atom)
    return [getRecoilAtom(recoilValue), setRecoilAtom(recoilValue)]
  return [getRecoilSelecor(recoilValue), setRecoilSelector(recoilValue)]
}

export const isRecoilValue = (value: any): boolean => {
  if (value instanceof Atom) return true
  if (value instanceof Selector) return true
  return false
}

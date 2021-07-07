import { useCallback } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Store } from 'redux'
import { Atom } from '../atom'
import { RecoilValue } from '../index'
import { State } from '../redux/reducer'
import { Selector } from '../selector'

type SetRecoilValueFunction<T> = (newValue: T) => void

export const getRecoilValue = <T>(
  recoilValue: RecoilValue<T>,
  store: Store,
): T => {
  const { key } = recoilValue
  recoilValue.register(store)

  return useSelector<State, T>(state => {
    return state[key] as T
  })
}

export const setRecoilValue = <T>(
  recoilValue: RecoilValue<T>,
  store: Store,
): SetRecoilValueFunction<T> => {
  recoilValue.register(store)

  return useCallback(value => {
    recoilValue.setValue(value)
  }, [])
}

export const useRecoilValue = <T>(recoilValue: RecoilValue<T>): T => {
  const store = useStore()
  return getRecoilValue(recoilValue, store)
}

export const useSetRecoilState = <T>(
  recoilValue: RecoilValue<T>,
): SetRecoilValueFunction<T> => {
  const store = useStore()
  return setRecoilValue(recoilValue, store)
}

export const useRecoilState = <T>(
  recoilValue: RecoilValue<T>,
): [T, SetRecoilValueFunction<T>] => {
  const store = useStore()

  return [
    getRecoilValue(recoilValue, store),
    setRecoilValue(recoilValue, store),
  ]
}

export const isRecoilValue = (value: unknown): boolean => {
  if (value instanceof Atom) return true
  if (value instanceof Selector) return true
  return false
}

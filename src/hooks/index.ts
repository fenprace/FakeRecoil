import { useCallback, useContext } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Atom } from '../atom'
import { RecoilValue } from '../index'
import { Selector } from '../selector'
import { State } from '../recoilReducer'
import { setValueByKey } from '../utils'
import RecoilReducerKeyContext from '../components/RecoilReducerKeyContext'
import { Store } from 'redux'

type SetRecoilValueFunction<T> = (newValue: T) => void

export const getRecoilAtom = <T>(
  atom: Atom<T>,
  store: Store,
  recoilReducerKey?: string,
): T => {
  const { key } = atom
  atom.register(store)

  return useSelector<State, T>(state => {
    if (recoilReducerKey) {
      return (state[recoilReducerKey] as State)[key] as T
    }

    return state[key] as T
  })
}

export const setRecoilAtom = <T>(
  atom: Atom<T>,
  store: Store,
): SetRecoilValueFunction<T> => {
  const { key } = atom
  atom.register(store)

  return useCallback(value => {
    setValueByKey(key, value, store)
  }, [])
}

export const getRecoilSelecor = <T>(
  selector: Selector<T>,
  store: Store,
  recoilReducerKey?: string,
): T => {
  const { key } = selector
  selector.register(store, recoilReducerKey)

  return useSelector<State, T>(state => {
    if (recoilReducerKey) {
      return (state[recoilReducerKey] as State)[key] as T
    }

    return state[key] as T
  })
}

export const setRecoilSelector = <T>(
  selector: Selector<T>,
  store: Store,
  recoilReducerKey?: string,
): SetRecoilValueFunction<T> => {
  const { setUpstreamValue } = selector
  selector.register(store, recoilReducerKey)

  return useCallback(value => {
    setUpstreamValue(value)
  }, [])
}

export const useRecoilValue = <T>(recoilValue: RecoilValue<T>): T => {
  const store = useStore()
  const recoilReducerKey = useContext(RecoilReducerKeyContext)

  if (recoilValue instanceof Atom)
    return getRecoilAtom(recoilValue, store, recoilReducerKey)
  return getRecoilSelecor(recoilValue, store, recoilReducerKey)
}

export const useSetRecoilState = <T>(
  recoilValue: RecoilValue<T>,
): SetRecoilValueFunction<T> => {
  const store = useStore()
  const recoilReducerKey = useContext(RecoilReducerKeyContext)

  if (recoilValue instanceof Atom) return setRecoilAtom(recoilValue, store)
  return setRecoilSelector(recoilValue, store, recoilReducerKey)
}

export const useRecoilState = <T>(
  recoilValue: RecoilValue<T>,
): [T, SetRecoilValueFunction<T>] => {
  const store = useStore()
  const recoilReducerKey = useContext(RecoilReducerKeyContext)

  if (recoilValue instanceof Atom)
    return [
      getRecoilAtom(recoilValue, store, recoilReducerKey),
      setRecoilAtom(recoilValue, store),
    ]

  return [
    getRecoilSelecor(recoilValue, store, recoilReducerKey),
    setRecoilSelector(recoilValue, store, recoilReducerKey),
  ]
}

export const isRecoilValue = (value: unknown): boolean => {
  if (value instanceof Atom) return true
  if (value instanceof Selector) return true
  return false
}

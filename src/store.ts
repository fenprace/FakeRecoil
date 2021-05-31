import { createStore } from 'redux'
import { RecoilValue } from './index'

export interface State<T> {
  [index: string]: T
}

const initialState: State<any> = {}

interface Action<T> {
  type: string
  payload?: T
}

const rootReducer = (state = initialState, action: Action<any>) => {
  const { type, payload } = action

  if (type === 'SET_ATOM') {
    const { key, value } = payload

    return {
      ...state,
      [key]: value,
    }
  }

  return state
}

const store = createStore(rootReducer)

export const getValueByKey = <T>(key: string) => {
  const state = store.getState() as State<T>
  return state[key]
}

export const getValuesByKeys = <T>(keys: string[]) => {
  const state = store.getState() as State<T>
  return keys.map(key => state[key])
}

export const getValue = <T>({ key }: RecoilValue<T>) => {
  return getValueByKey<T>(key)
}

export const setValueByKey = <T>(key: string, value: T) => {
  store.dispatch({ type: 'SET_ATOM', payload: { key, value: value } })
}

export const setValue = <T>({ key }: RecoilValue<T>, value: T) => {
  setValueByKey(key, value)
}

export default store

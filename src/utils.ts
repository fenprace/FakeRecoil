import { RecoilValue } from './index'

export interface State {
  [index: string]: any
}

const initialState: State = {}

interface Action<T> {
  type: string
  payload?: T
}

export const recoilReducer = (state = initialState, action: Action<any>) => {
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

export const getValueByKey = <T>(
  key: string,
  store: any,
  recoilReducerKey?: string,
): T => {
  const state = store.getState() as State
  if (recoilReducerKey) return state[recoilReducerKey][key]
  return state[key]
}

export const getValuesByKeys = (
  keys: string[],
  store: any,
  recoilReducerKey?: string,
) => {
  const state = store.getState() as State
  if (recoilReducerKey) return keys.map(key => state[recoilReducerKey][key])
  return keys.map(key => state[key])
}

export const getValue = <T>(
  { key }: RecoilValue<T>,
  store: any,
  recoilReducerKey?: string,
): T => {
  return getValueByKey(key, store, recoilReducerKey)
}

export const setValueByKey = <T>(key: string, value: T, store: any) => {
  store.dispatch({ type: 'SET_ATOM', payload: { key, value: value } })
}

export const setValue = <T>({ key }: RecoilValue<T>, value: T, store: any) => {
  setValueByKey(key, value, store)
}

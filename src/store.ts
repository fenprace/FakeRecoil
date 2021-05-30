import { createStore } from 'redux'
import { RecoilValue } from './index'

export interface State {
  [index: string]: any
}

const initialState: State = {}

interface Action {
  type: string
  payload?: any
}

const rootReducer = (state = initialState, action: Action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_ATOM':
      const { key, value } = payload

      return {
        ...state,
        [key]: value,
      }

    default:
      return state
  }
}

const store = createStore(rootReducer)

export const getValueByKey = (key: string) => {
  const state = store.getState() as State
  return state[key]
}

export const getValuesByKeys = (keys: string[]) => {
  const state = store.getState() as State
  return keys.map(key => state[key])
}

export const getValue = ({ key }: RecoilValue) => {
  return getValueByKey(key)
}

export const setValueByKey = (key: string, value: any) => {
  store.dispatch({ type: 'SET_ATOM', payload: { key, value: value } })
}

export const setValue = ({ key }: RecoilValue, value: any) => {
  setValueByKey(key, value)
}

export default store

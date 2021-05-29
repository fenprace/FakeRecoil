import { createStore } from 'redux'

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

export const getValueFromStore = (key: string) => {
  const state = store.getState() as State
  return state[key]
}

export const getValuesFromStore = (keys: string[]) => {
  const state = store.getState() as State
  return keys.map(key => state[key])
}

export const setValueToStore = (key: string, value: any) => {
  store.dispatch({ type: 'SET_ATOM', payload: { key, value: value } })
}

export default store

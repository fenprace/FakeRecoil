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

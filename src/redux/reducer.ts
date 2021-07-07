export interface State {
  [index: string]: unknown
}

const initialState: State = {}

interface Payload {
  key: string
  value: unknown
}

export interface Action {
  type: string
  payload?: Payload
}

export const reducer = (state = initialState, action: Action): State => {
  const { type, payload } = action

  if (type === 'SET_ATOM') {
    const { key, value } = payload as Payload

    return {
      ...state,
      [key]: value,
    }
  }

  return state
}

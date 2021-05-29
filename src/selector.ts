import store, { getValueFromStore, getValuesFromStore } from './store'
import { RecoilValue } from './index'

interface SelectorGetProps {
  get: (recoilValue: RecoilValue) => any
}

type SelectorGetFunction = (s: SelectorGetProps) => any

interface SelectorSetProps {
  get: (recoilValue: RecoilValue) => any
  set: (recoilValue: RecoilValue, newValue: any) => any
  reset: (recoilValue: RecoilValue) => any
}

type SelectorSetFunction = (s: SelectorSetProps, newValue: any) => any

interface SelectorProps {
  key: string
  get: SelectorGetFunction
  set?: SelectorSetFunction
}

const _getValueFromStore = ({ key }: RecoilValue) => {
  return getValueFromStore(key)
}

const compareArray = (a: string[], b: string[]): boolean => {
  for (let i in a) {
    if (a[i] !== b[i]) return false
  }

  return true
}

interface SelectorMap {
  [index: string]: Selector
}

const _AllSelector: SelectorMap = {}

export class Selector {
  public key: string
  public get: SelectorGetFunction
  public set?: SelectorGetFunction

  private dependencies: string[] = []
  private previousDependencies: string[] = []
  private previousValue: any

  private subscribe = () => {
    store.subscribe(this.update)
  }

  private firstUpdate = () => {
    const hookedGetValueFromStore = (recoilValue: RecoilValue) => {
      const { key } = recoilValue
      const value = _getValueFromStore(recoilValue)

      this.dependencies.push(key)
      this.previousDependencies.push(value)

      return value
    }

    const value = this.get({ get: hookedGetValueFromStore })
    this.previousValue = value
    store.dispatch({ type: 'SET_ATOM', payload: { key: this.key, value } })
  }

  private update = () => {
    const currentDependencies = getValuesFromStore(this.dependencies)
    if (compareArray(this.previousDependencies, currentDependencies)) {
      this.previousDependencies = currentDependencies
      return
    }

    this.previousDependencies = currentDependencies

    const value = this.get({ get: _getValueFromStore })
    if (value !== this.previousValue) {
      this.previousValue = value
      store.dispatch({ type: 'SET_ATOM', payload: { key: this.key, value } })
    }
  }

  constructor({ key, get: computeValue }: SelectorProps) {
    this.key = key
    this.get = computeValue

    this.firstUpdate()
    this.subscribe()

    _AllSelector[key] = this
  }
}

export const selector = (props: SelectorProps) => {
  const { key } = props

  if (_AllSelector[key]) return _AllSelector[key]
  return new Selector(props)
}

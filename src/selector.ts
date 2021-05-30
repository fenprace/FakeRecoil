import { RecoilValue } from './index'
import store, {
  getValue,
  getValuesByKeys,
  setValue,
  setValueByKey,
} from './store'

interface SelectorGetProps {
  get: (recoilValue: RecoilValue) => any
}

type SelectorGetFunction = (s: SelectorGetProps) => any

interface SelectorSetProps {
  get: (recoilValue: RecoilValue) => any
  set: (recoilValue: RecoilValue, newValue: any) => any
  // reset: (recoilValue: RecoilValue) => any
}

type SelectorSetFunction = (s: SelectorSetProps, newValue: any) => any

interface SelectorProps {
  key: string
  get: SelectorGetFunction
  set?: SelectorSetFunction
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
  private _key: string
  private _get: SelectorGetFunction
  private _set?: SelectorSetFunction

  private dependencies: string[] = []
  private previousDependencies: string[] = []
  private previousValue: any

  public get key() {
    return this._key
  }

  public get get() {
    return this._get
  }

  public get set() {
    return this._set
  }

  private subscribe = () => {
    store.subscribe(this.update)
  }

  public setUpstreamValue = (newValue: any) => {
    if (!this.set) {
      console.error(
        `You are trying to set value to a readonly selector with key ${this.key}.`,
      )
      return
    }

    this.set({ get: getValue, set: setValue }, newValue)
  }

  private firstUpdate = () => {
    const hookedGetValue = (recoilValue: RecoilValue) => {
      const { key } = recoilValue
      const value = getValue(recoilValue)

      this.dependencies.push(key)
      this.previousDependencies.push(value)

      return value
    }

    const value = this.get({ get: hookedGetValue })
    this.previousValue = value
    setValueByKey(this.key, value)
  }

  private update = () => {
    const currentDependencies = getValuesByKeys(this.dependencies)
    if (compareArray(this.previousDependencies, currentDependencies)) {
      this.previousDependencies = currentDependencies
      return
    }

    this.previousDependencies = currentDependencies

    const value = this.get({ get: getValue })
    if (value !== this.previousValue) {
      this.previousValue = value
      setValueByKey(this.key, value)
    }
  }

  constructor({ key, get, set }: SelectorProps) {
    this._key = key
    this._get = get
    this._set = set

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

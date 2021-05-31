import { RecoilValue } from './index'
import store, {
  getValue,
  getValuesByKeys,
  setValue,
  setValueByKey,
} from './store'

interface SelectorGetProps {
  get: <T>(recoilValue: RecoilValue<T>) => T
}

interface SelectorSetProps {
  get: <T>(recoilValue: RecoilValue<T>) => T
  set: <T>(recoilValue: RecoilValue<T>, newValue: T) => void
  // reset: (recoilValue: RecoilValue) => any
}

type SelectorGetFunction<T> = (s: SelectorGetProps) => T
type SelectorSetFunction<T> = (s: SelectorSetProps, newValue: T) => void

interface SelectorProps<T> {
  key: string
  get: SelectorGetFunction<T>
  set?: SelectorSetFunction<T>
}

const compareArray = (a: any[], b: any[]): boolean => {
  for (let i in a) {
    if (a[i] !== b[i]) return false
  }

  return true
}

interface SelectorMap {
  [index: string]: Selector<any>
}

const _AllSelector: SelectorMap = {}

export class Selector<T> {
  private _key: string
  private _get: SelectorGetFunction<T>
  private _set?: SelectorSetFunction<T>

  private dependencies: string[] = []
  private previousDependencies: any[] = []
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
    const hookedGetValue = (recoilValue: RecoilValue<any>) => {
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
    const currentDependencies = getValuesByKeys<any>(this.dependencies)
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

  constructor({ key, get, set }: SelectorProps<T>) {
    this._key = key
    this._get = get
    this._set = set

    this.firstUpdate()
    this.subscribe()

    _AllSelector[key] = this
  }
}

export const selector = <T>(props: SelectorProps<T>) => {
  const { key } = props

  if (_AllSelector[key]) return _AllSelector[key]
  return new Selector<T>(props)
}

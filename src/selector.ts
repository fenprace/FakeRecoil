import { Store } from 'redux'
import { RecoilValue } from './index'
import { getValue, getValuesByKeys, setValue, setValueByKey } from './utils'

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

export class Selector<T> {
  private _dependencies: string[] = []
  private _get: SelectorGetFunction<T>
  private _key: string
  private _previousDependencies: any[] = []
  private _previousValue: any
  private _recoilReducerKey?: string
  private _registered: boolean = false
  private _set?: SelectorSetFunction<T>
  private _store?: Store

  public get key() {
    return this._key
  }

  public get get() {
    return this._get
  }

  public get set() {
    return this._set
  }

  private _getValue = <T>(recoilValue: RecoilValue<T>) => {
    return getValue(recoilValue, this._store, this._recoilReducerKey)
  }

  private _setValue = <T>(recoilValue: RecoilValue<T>, newValue: T) => {
    setValue(recoilValue, newValue, this._store)
  }

  private _hookedGetValue = (recoilValue: RecoilValue<any>) => {
    const { key } = recoilValue
    const value = this._getValue(recoilValue)

    this._dependencies.push(key)
    this._previousDependencies.push(value)

    return value
  }

  private _firstUpdate = () => {
    const value = this.get({ get: this._hookedGetValue })
    this._previousValue = value

    setValueByKey(this.key, value, this._store)
  }

  private _update = () => {
    const currentDependencies = getValuesByKeys(
      this._dependencies,
      this._store,
      this._recoilReducerKey,
    )

    if (compareArray(this._previousDependencies, currentDependencies)) {
      this._previousDependencies = currentDependencies
      return
    }

    this._previousDependencies = currentDependencies

    const value = this.get({ get: this._getValue })
    if (value !== this._previousValue) {
      this._previousValue = value
      setValueByKey(this.key, value, this._store)
    }
  }

  public setUpstreamValue = (newValue: any) => {
    if (!this.set) {
      console.error(
        `You are trying to set value to a readonly selector with key ${this.key}.`,
      )
      return
    }

    this.set({ get: this._getValue, set: this._setValue }, newValue)
  }

  public register(store: Store, recoilReducerKey?: string) {
    if (this._registered) return

    this._registered = true
    this._store = store
    this._recoilReducerKey = recoilReducerKey

    this._firstUpdate()
    this._store.subscribe(this._update)
  }

  constructor({ key, get, set }: SelectorProps<T>) {
    this._key = key
    this._get = get
    this._set = set
  }
}

export const selector = <T>(props: SelectorProps<T>) => {
  return new Selector<T>(props)
}

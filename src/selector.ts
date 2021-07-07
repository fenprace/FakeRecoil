import { Store } from 'redux'
import { RecoilValue } from './index'
import {
  compareArray,
  getValue,
  getValueByKey,
  getValuesByKeys,
  setValue,
  setValueByKey,
} from './utils'

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

export class Selector<T> {
  private _dependencies: string[] = [] // Keys of dependencies
  private _get: SelectorGetFunction<T>
  private _key: string
  private _previousDependencies: unknown[] = [] // Values of dependencies
  private _previousValue: unknown // Previous value of this selector
  private _registered = false
  private _set?: SelectorSetFunction<T>
  private _store?: Store

  public get key(): string {
    return this._key
  }

  public get get(): SelectorGetFunction<T> {
    return this._get
  }

  public get set(): SelectorSetFunction<T> | undefined {
    return this._set
  }

  private _getUpstreamValue = <U>(recoilValue: RecoilValue<U>) => {
    recoilValue.register(this._store as Store)
    return getValue(recoilValue, this._store as Store)
  }

  private _setUpstreamValue = <U>(recoilValue: RecoilValue<U>, newValue: U) => {
    recoilValue.register(this._store as Store)
    setValue(recoilValue, newValue, this._store as Store)
  }

  private _hookedGetValue = <U>(recoilValue: RecoilValue<U>) => {
    const { key } = recoilValue
    const value = this._getUpstreamValue(recoilValue)

    this._dependencies.push(key)
    this._previousDependencies.push(value)

    return value
  }

  private _firstUpdate = () => {
    const value = this.get({ get: this._hookedGetValue })
    this._previousValue = value

    setValueByKey(this.key, value, this._store as Store)
  }

  private _update = () => {
    if (!this._store) {
      console.error(
        `The selector with key ${this._key} is used before it registered with a store.`,
      )

      return
    }

    const currentDependencies = getValuesByKeys(this._dependencies, this._store)

    if (compareArray(this._previousDependencies, currentDependencies)) {
      this._previousDependencies = currentDependencies
      return
    }

    this._previousDependencies = currentDependencies

    const value = this.get({ get: this._getUpstreamValue })
    if (value !== this._previousValue) {
      this._previousValue = value
      setValueByKey(this.key, value, this._store)
    }
  }

  public getValue(): T {
    return getValueByKey(this._key, this._store as Store)
  }

  public setValue = (newValue: T): void => {
    if (!this.set) {
      console.error(
        `You are trying to set value to a readonly selector with key ${this.key}.`,
      )
      return
    }

    this.set(
      { get: this._getUpstreamValue, set: this._setUpstreamValue },
      newValue,
    )
  }

  public register(store: Store): void {
    if (this._registered) return

    this._registered = true
    this._store = store

    this._firstUpdate()
    this._store.subscribe(this._update)
  }

  constructor({ key, get, set }: SelectorProps<T>) {
    this._key = key
    this._get = get
    this._set = set
  }
}

export const selector = <T>(props: SelectorProps<T>): Selector<T> => {
  return new Selector<T>(props)
}

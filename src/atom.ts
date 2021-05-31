import { Store } from 'redux'
import { setValueByKey } from './utils'

export interface AtomProps<T> {
  key: string
  default: T | (() => T)
}

export class Atom<T> {
  private _default: T
  private _key: string
  private _registered = false
  private _store?: Store

  public get key(): string {
    return this._key
  }

  public get default(): T {
    return this._default
  }

  public register(store: Store): void {
    if (this._registered) return
    this._registered = true
    this._store = store

    setValueByKey(this._key, this.default, this._store)
  }

  constructor({ key, default: defaultValue }: AtomProps<T>) {
    this._key = key

    if (defaultValue instanceof Function) this._default = defaultValue()
    else this._default = defaultValue
  }
}

export const atom = <T>(props: AtomProps<T>): Atom<T> => {
  return new Atom(props)
}

import { setValueByKey } from './store'

export interface AtomProps<T> {
  key: string
  default: T | (() => T)
}

interface AtomMap {
  [index: string]: Atom<any>
}

const _AllAtoms: AtomMap = {}

export class Atom<T> {
  private _key: string
  private _default: T

  public get key() {
    return this._key
  }

  public get default() {
    return this._default
  }

  constructor({ key, default: defaultValue }: AtomProps<T>) {
    this._key = key

    if (defaultValue instanceof Function) this._default = defaultValue()
    else this._default = defaultValue

    setValueByKey(key, this.default)

    _AllAtoms[key] = this
  }
}

export const atom = <T>(props: AtomProps<T>): Atom<T> => {
  const { key } = props

  if (_AllAtoms[key]) return _AllAtoms[key]
  return new Atom(props)
}

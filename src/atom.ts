import { setValueByKey } from './store'

export interface AtomProps {
  key: string
  default: any | (() => any)
}

interface AtomMap {
  [index: string]: Atom
}

const _AllAtoms: AtomMap = {}

export class Atom {
  private _key: string
  private _default: any

  public get key() {
    return this._key
  }

  public get default() {
    return this._default
  }

  constructor({ key, default: defaultValue }: AtomProps) {
    this._key = key

    if (defaultValue instanceof Function) this._default = defaultValue()
    else this._default = defaultValue

    setValueByKey(key, this.default)

    _AllAtoms[key] = this
  }
}

export const atom = (props: AtomProps): Atom => {
  const { key } = props

  if (_AllAtoms[key]) return _AllAtoms[key]
  return new Atom(props)
}

import store from './store'

export interface AtomProps {
  key: string
  default: any
}

interface AtomMap {
  [index: string]: Atom
}

const _AllAtoms: AtomMap = {}

export class Atom {
  public key: string
  public default: any

  private setValue(value: any) {
    store.dispatch({ type: 'SET_ATOM', payload: { key: this.key, value } })
  }

  constructor({ key, default: defaultValue }: AtomProps) {
    this.key = key
    this.default = defaultValue

    this.setValue(defaultValue)

    _AllAtoms[key] = this
  }
}

export const atom = (props: AtomProps): Atom => {
  const { key } = props

  if (_AllAtoms[key]) return _AllAtoms[key]
  return new Atom(props)
}

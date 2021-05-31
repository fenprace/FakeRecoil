import { atom, Atom } from './atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from './hooks'
import RecoilRoot from './RecoilRoot'
import { selector, Selector } from './selector'

export type RecoilValue<T> = Atom<T> | Selector<T>

export {
  atom,
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
}

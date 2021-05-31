import { atom, Atom } from './atom'
import RecoilRoot from './components/RecoilRoot'
import {
  isRecoilValue,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from './hooks'
import { recoilReducer } from './recoilReducer'
import { selector, Selector } from './selector'

export type RecoilValue<T> = Atom<T> | Selector<T>

export {
  atom,
  isRecoilValue,
  recoilReducer,
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
}

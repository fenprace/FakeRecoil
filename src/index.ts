import { atom, Atom } from './atom'
import RecoilRoot from './components/RecoilRoot'
import {
  isRecoilValue,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from './hooks'
import { reducer as recoilReducer } from './redux/reducer'
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

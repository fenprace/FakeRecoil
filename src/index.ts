import { atom, Atom } from './atom'
import { useRecoilState, useRecoilValue } from './hooks'
import RecoilRoot from './RecoilRoot'
import { selector, Selector } from './selector'

export type RecoilValue = Atom | Selector

export { atom, selector, RecoilRoot, useRecoilState, useRecoilValue }

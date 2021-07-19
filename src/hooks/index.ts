import { useContext } from 'react'
import RecoilContext from '../context'
import RecoilStore from '../store'
import { RecoilValue, Setter } from '../types'

export const useRecoilStore = (): RecoilStore => {
  return useContext(RecoilContext)
}

export const useRecoilValue = <T>(rv: RecoilValue<T>): T => {
  const store = useRecoilStore()
  return store.useValue(rv)
}

export const useSetRecoilState = <T>(rv: RecoilValue<T>): Setter<T> => {
  const store = useRecoilStore()
  return store.useSetter(rv)
}

export const useRecoilState = <T>(rv: RecoilValue<T>): [T, Setter<T>] => {
  const value = useRecoilValue(rv)
  const setValue = useSetRecoilState(rv)
  return [value, setValue]
}

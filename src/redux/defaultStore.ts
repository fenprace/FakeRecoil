import { createStore, Store } from 'redux'
import { reducer } from './reducer'

export const createRecoilStore = (): Store => createStore(reducer)

const defaultStore = createRecoilStore()

export default defaultStore

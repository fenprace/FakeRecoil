import { createStore, Store } from 'redux'
import { recoilReducer } from './recoilReducer'

export const createRecoilStore = (): Store => createStore(recoilReducer)

const recoilDefaultStore = createStore(recoilReducer)

export default recoilDefaultStore

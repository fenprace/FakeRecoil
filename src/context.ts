import React from 'react'
import { defaultStore } from './store'
import { RecoilStoreRef } from './types'

const RecoilContext = React.createContext<RecoilStoreRef>({
  current: defaultStore,
})

export default RecoilContext

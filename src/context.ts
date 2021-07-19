import React from 'react'
import RecoilStore, { defaultStore } from './store'

const RecoilContext = React.createContext<RecoilStore>(defaultStore)

export default RecoilContext

import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

interface RecoilRootProps {
  children: React.ReactNode
}

const RecoilRoot = ({ children }: RecoilRootProps) => {
  return <Provider store={store}>{children}</Provider>
}

export default RecoilRoot

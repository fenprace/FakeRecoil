import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { recoilReducer } from '../recoilReducer'
import RecoilReducerKeyContext from './RecoilReducerKeyContext'

interface RecoilRootProps {
  children: React.ReactNode
  recoilReducerKey?: string
}

const defaultStore = createStore(recoilReducer)

const RecoilRoot = ({ children, recoilReducerKey }: RecoilRootProps) => {
  if (recoilReducerKey)
    return (
      <RecoilReducerKeyContext.Provider value={recoilReducerKey}>
        {children}
      </RecoilReducerKeyContext.Provider>
    )

  return <Provider store={defaultStore}>{children}</Provider>
}

export default RecoilRoot

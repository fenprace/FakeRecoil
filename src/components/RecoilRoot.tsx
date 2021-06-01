import React from 'react'
import { Provider } from 'react-redux'
import recoilDefaultStore from '../recoilDefaultStore'
import RecoilReducerKeyContext from './RecoilReducerKeyContext'

interface RecoilRootProps {
  children: React.ReactNode
  recoilReducerKey?: string
}

const RecoilRoot: React.FC<RecoilRootProps> = ({
  children,
  recoilReducerKey,
}: RecoilRootProps) => {
  if (recoilReducerKey)
    return (
      <RecoilReducerKeyContext.Provider value={recoilReducerKey}>
        {children}
      </RecoilReducerKeyContext.Provider>
    )

  return <Provider store={recoilDefaultStore}>{children}</Provider>
}

export default RecoilRoot

import React from 'react'
import { Provider } from 'react-redux'
import defaultStore from '../redux/defaultStore'

interface RecoilRootProps {
  children: React.ReactNode
}

const RecoilRoot: React.FC<RecoilRootProps> = ({
  children,
}: RecoilRootProps) => {
  return <Provider store={defaultStore}>{children}</Provider>
}

export default RecoilRoot

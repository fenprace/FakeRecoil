import React, { useRef } from 'react'
import RecoilContext from './context'
import { defaultStore } from './store'

interface RecoilRootProps {
  children: React.ReactNode
}

const RecoilRoot: React.FC<RecoilRootProps> = ({
  children,
}: RecoilRootProps) => {
  const ref = useRef(defaultStore)
  return <RecoilContext.Provider value={ref}>{children}</RecoilContext.Provider>
}

export default RecoilRoot

import React, { useState } from 'react'
import RecoilContext from './context'
import RecoilStore from './store'

interface RecoilRootProps {
  children: React.ReactNode
}

const RecoilRoot: React.FC<RecoilRootProps> = ({
  children,
}: RecoilRootProps) => {
  const [store] = useState(() => new RecoilStore())

  return (
    <RecoilContext.Provider value={store}>{children}</RecoilContext.Provider>
  )
}

export default RecoilRoot

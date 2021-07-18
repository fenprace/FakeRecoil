import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from '../../src'
import Root from './Root'

ReactDOM.render(
  <RecoilRoot>
    <Root />
  </RecoilRoot>,
  document.getElementById('root'),
)

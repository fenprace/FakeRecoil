import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import { RecoilRoot } from '../../src'

ReactDOM.render(
  <RecoilRoot>
    <Root />
  </RecoilRoot>,
  document.getElementById('root'),
)

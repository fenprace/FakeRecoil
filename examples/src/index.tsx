import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from '../../src'
import * as atoms from './atoms'
import Inc from './components/Inc'
import Root from './Root'

ReactDOM.render(
  <RecoilRoot>
    <Root>
      <Inc atom={atoms.countII} />
    </Root>
  </RecoilRoot>,
  document.getElementById('root'),
)

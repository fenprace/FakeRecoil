import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import { RecoilRoot, recoilReducer } from '../../src'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({ __recoilStates: recoilReducer })

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <RecoilRoot recoilReducerKey="__recoilStates">
      <Root />
    </RecoilRoot>
  </Provider>,
  document.getElementById('root'),
)

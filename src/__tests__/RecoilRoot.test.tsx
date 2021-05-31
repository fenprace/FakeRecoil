import React from 'react'
import renderer from 'react-test-renderer'
import { RecoilRoot } from '../index'

it('renders correctly with children', () => {
  const tree = renderer.create(<RecoilRoot>FakeRecoil</RecoilRoot>).toJSON()
  expect(tree).toMatchInlineSnapshot('"FakeRecoil"')
})

# FakeRecoil

![CI Status](https://github.com/fenprace/FakeRecoil/actions/workflows/build.yml/badge.svg)

A Naive [Recoil](https://github.com/facebookexperimental/Recoil) Implementation.

## Getting Started

### Dependency

This implementation relies on `redux` & `react-redux` packages for global state management.

## TODOs

- [ ] RecoilRoot
  - [ ] initializeState
  - [ ] override
  - [ ] Support multiple & nested `<RecoilRoot />`s
- [x] Atom
  - [x] Lazy Initialization
- [ ] Selector
  - [x] Readonly Selector
  - [x] Writable Selector
  - [x] Reset Selector
- [x] Hooks
  - [x] useRecoilState()
  - [x] useSetRecoilState()
  - [x] useRecoilValue()
  - [x] useResetRecoilState()
- [x] IsRecoilValue()
- [ ] Unit Tests

## Possibly will do, one day in the future...

- atomFamily()
- selectorFamily()
- Snapshot
- Loadable
- Async Selector

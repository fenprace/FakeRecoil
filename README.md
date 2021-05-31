# FakeRecoil

![CI Status](https://github.com/fenprace/FakeRecoil/actions/workflows/build.yml/badge.svg)

A Naive [Recoil](https://github.com/facebookexperimental/Recoil) Implementation.

## Getting Started

### Dependency

This implementation relies on `redux` & `react-redux` packages for global state management.

### Integrate with current redux store

WIP...

## TODOs

- [ ] RecoilRoot
  - [ ] initializeState
  - [ ] override
- [x] Atom
  - [x] Lazy Initialization
- [ ] Selector
  - [x] Readonly Selector
  - [x] Writable Selector
- [ ] Hooks
  - [x] useRecoilState()
  - [x] useSetRecoilState()
  - [x] useRecoilValue()
  - [ ] useResetRecoilState()
- [x] IsRecoilValue()
- [ ] Unit Tests
- [ ] Support multiple & nested `<RecoilRoot />`s

## Possibly will do, one day in the future...

- atomFamily()
- selectorFamily()
- Snapshot
- Loadable
- Async Selector

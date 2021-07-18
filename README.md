# FakeRecoil

![CI Status](https://github.com/fenprace/FakeRecoil/actions/workflows/build.yml/badge.svg)

A Naive [Recoil](https://github.com/facebookexperimental/Recoil) Implementation.

## Installation

```
npm i --save-dev fake-recoil
```

## Features

- [x] RecoilRoot
  - [ ] initializeState
  - [ ] override
- [x] Atom
  - [x] Lazy Initialization
  - [x] atomFamily()
- [x] Selector
  - [x] Readonly Selector
  - [x] Writable Selector
  - [ ] Reset Selector
  - [x] selectorFamily()
- [ ] Hooks
  - [x] useRecoilState()
  - [x] useSetRecoilState()
  - [x] useRecoilValue()
  - [ ] useResetRecoilState()
- [x] IsRecoilValue()
- [ ] Unit Tests

## Good to Have

- Snapshot
- Loadable
- Async Selector

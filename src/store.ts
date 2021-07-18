import { useCallback, useLayoutEffect, useState } from 'react'
import RecoilState from './state'
import {
  Atom,
  RecoilKey,
  RecoilValue,
  Selector,
  Setter,
  ListenerCallback,
  StateFamily,
} from './types'
import { DEFAULT_INDEX, isAtom, isSelector } from './utils'

class RecoilStore {
  private map: Map<RecoilKey, StateFamily<any>> = new Map()

  private initialize = <T>(rv: RecoilValue<T>): T => {
    if (isAtom(rv)) {
      return (rv as Atom<T>).default
    }

    if (isSelector(rv)) {
      const get = <U>(upstream: RecoilValue<U>): U => {
        const upstreamState = this.getState(upstream)
        upstreamState.on(() =>
          this.setValue(rv, (rv as Selector<T>).get({ get: this.getValue })),
        )
        return upstreamState.value
      }

      return (rv as Selector<T>).get({ get })
    }

    throw new Error()
  }

  private register<T>(rv: RecoilValue<T>): RecoilState<T> {
    const value = this.initialize(rv)
    const state = new RecoilState(value)
    return state
  }

  public getState = <T>(rv: RecoilValue<T>): RecoilState<T> => {
    const { key, index: _index } = rv

    let index = _index || DEFAULT_INDEX
    let family = this.map.get(key)

    if (!family) {
      family = new Map()
      this.map.set(key, family)
    }

    let state = family.get(index)

    if (!state) {
      state = this.register(rv)
      family.set(index, state)
    }

    return state
  }

  public getValue = <T>(rv: RecoilValue<T>): T => {
    return this.getState(rv).value
  }

  public setValue = <T>(rv: RecoilValue<T>, value: T): void => {
    const state = this.getState(rv)

    if (isAtom(rv)) {
      state.setValue(value)
    }

    if (isSelector(rv)) {
      const { set } = rv as Selector<T>
      if (set) {
        set({ get: this.getValue, set: this.setValue }, value)
      }

      state.setValue(value)
    }
  }

  public subscribe<T>(rv: RecoilValue<T>, cb: ListenerCallback<T>): void {
    const state = this.getState(rv)
    state.on(cb)
  }

  public unsubscribe<T>(rv: RecoilValue<T>, cb: ListenerCallback<T>): void {
    const state = this.getState(rv)
    state.off(cb)
  }

  public useValue<T>(rv: RecoilValue<T>): T {
    const [, update] = useState({})
    const updater = useCallback(() => update({}), [])

    useLayoutEffect(() => {
      this.subscribe(rv, updater)
      return () => this.unsubscribe(rv, updater)
    }, [])

    return this.getValue(rv)
  }

  public useSetter<T>(rv: RecoilValue<T>): Setter<T> {
    const cb: Setter<T> = value => {
      let newValue = value

      if (value instanceof Function) {
        const prevValue = this.getValue(rv)
        newValue = value(prevValue)
      }

      this.setValue(rv, newValue as T)
    }

    return useCallback(cb, [])
  }
}

export const defaultStore = new RecoilStore()

export default RecoilStore

import { ListenerCallback } from './types'

class RecoilState<T = unknown, Index = unknown> {
  private _value: T
  private familyIndex?: Index
  private listeners: ListenerCallback<T>[] = []

  constructor(value: T) {
    this._value = value
  }

  public on(cb: ListenerCallback<T>): void {
    this.listeners = [...this.listeners, cb]
  }

  public off(cb: ListenerCallback<T>): void {
    this.listeners = this.listeners.filter(l => l !== cb)
  }

  public getValue(): T {
    return this._value
  }

  public setValue(value: T): T {
    if (this._value !== value) {
      this._value = value
      this.listeners.forEach(cb => cb(value))
    }

    return this._value
  }

  get value(): T {
    return this.getValue()
  }

  set value(value: T) {
    this.setValue(value)
  }
}

export default RecoilState

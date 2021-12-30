/**
 * @template T
 * @param {T} state
 * @param {function(T?)?}onChange
 */
class State {
  onChange;
  _state;
  constructor(state, onChange) {
    this._state = state;
    this.onChange = onChange;
  }
  get state() {
    return this._state;
  }

  set state(value) {
    const old = this._state;
    this._state = value;
    // if (old === value) return;
    this.onChange?.(this._state, old);
  }
}

function getID() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

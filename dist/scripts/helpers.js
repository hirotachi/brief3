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

function parseDate(date) {
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

function diffInDays(startDate, endDate) {
  const diffInTime = endDate.getTime() - startDate.getTime();
  let result = diffInTime / (1000 * 3600 * 24);
  const reminder = result % 1;
  result += !reminder ? reminder : 1 - reminder;

  return result;
}

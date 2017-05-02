
/*
  | lisp type | js type  |
  |-----------+----------|
  | list      | array    |
  | vector    | tbd      |
  | map       | tbd      |
  | number    | number   |
  | boolean   | boolean  |
  | nil       | nil      |
  | symbol    | Symbol   |
  | func      | function |
  | string    | string   |
 * */

class Vector extends Array {
  constructor(...args) {
    super();
    args.forEach(item => {
      this.push(item);
    })
  }

  toString() {
    return `[${super.toString()}]`;
  }
}

function type(data) {
  if (typeof data === 'function') return 'function';
  if (typeof data === 'number') return 'number';
  if (typeof data === 'boolean') return 'boolean';
  if (typeof data === 'string') return 'string';
  if (data instanceof Vector) return 'vector';
  if (data === nil) return 'nil';
  if (Array.isArray(data)) return 'list';
  return 'symbol';
}

const nil = {
  type: 'nil',
  toString() { return 'nil'; }
};


module.exports = {
  type,
  nil,
  Vector,
};


const { partition } = require('./utils');
/*
  | lisp type | js type  |
  |-----------+----------|
  | list      | array    |
  | vector    | Vector   |
  | map       | Map      |
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
    return `[${this.join(' ')}]`;
  }
}

class Map {
  constructor(...args) {
    this.data = {};

    partition(args, 2).forEach(([key, val]) => {
      this.data[key] = val;
    });
  }

  set(key, val) {
    this.data[key] = val;
  }

  get(key) {
    return key in this.data ? this.data[key] : nil;
  }

  keys() {
    return Object.keys(this.data);
  }

  toString() {
    let pairs = Object.entries(this.data);
    let result = pairs.map(pair => pair.join(':'))
      .join(', ')
    return `{${result}}`;
  }
}

function type(data) {
  if (typeof data === 'function') return 'function';
  if (typeof data === 'number') return 'number';
  if (typeof data === 'boolean') return 'boolean';
  if (typeof data === 'string') return 'string';
  if (data instanceof Vector) return 'vector';
  if (data instanceof Map) return 'map';
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
  Map,
};

const { type, nil } = require('./types');
const { pr_str } = require('./printer');

const ns = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => parseInt(a / b),

  prn(data) {
    pr_str(data);
    return nil;
  },
  list(...args) {
    return Array.from(args);
  },
  'list?': (data) => {
    return type(data) === 'list';
  },
  'empty?': (list) => {
    return list.length == 0;
  },

  count(list) {
    return list.length;
  },
  '=': equal,
  '<': (a, b) => a < b,
  '>': (a, b) => a > b,
  '<=': (a, b) => a <= b,
  '>=': (a, b) => a >= b,
};

function equal(a, b) {
  if (type(a) !== type(b)) return false;
  if (type(a) === 'list' || type(a) === 'vector') {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!equal(a[i], b[i])) return false;
    }
    return true;
  }
  // TODO: map

  return a === b;
}

module.exports = {
  ns
}

const { type } = require('./types');

function pr_str(data) {
  if (type(data) === 'list') {
    return `(${data.map(pr_str).join(' ')})`;
  }

  if (type(data) === 'function') { return "#<function>"; }
  if (type(data) === 'string') { return `"${data}"`; }

  return data.toString();
}

module.exports = {
  pr_str
};


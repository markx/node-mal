
class Symbol {
  contructor(name) {
    this.name = name;
  }
}


function type(data) {
  if (typeof data === 'number') return 'number';
  if (Array.isArray(data)) return 'list';
  return 'symbol';
}

module.exports = {
  type,
  Symbol
};
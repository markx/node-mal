const types = require('./types');
const { Vector } = types;

function read_str(str) {
  const tokens = tokenizer(str);
  return read_form(tokens);
}

function tokenizer(str) {
  const re = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g;
  const tokens = [];

  let token;
  while (token = re.exec(str)[1]) {
    tokens.push(token);
  }
  return tokens;
}

function read_form(tokens) {
  if (tokens.length === 0) return [];

  if (tokens[0] === '(') { return read_list(tokens); }
  if (tokens[0] === '[') { return read_vector(tokens); }
  return read_atom(tokens);
}

function read_list(tokens) {
  let list = [];
  tokens.shift()

  while (true) {
    if (!tokens) { throw 'parse list error'; }

    if (tokens[0] === ')') {
      tokens.shift();
      return list;
    }

    list.push(read_form(tokens))
  }
}

function read_vector(tokens) {
  let vector = new Vector();
  tokens.shift()

  while (true) {
    if (!tokens) { throw 'parse vector error'; }

    if (tokens[0] === ']') {
      tokens.shift();
      return vector;
    }

    vector.push(read_form(tokens))
  }
}

function read_atom(tokens) {
  let token = tokens.shift();

  if (!isNaN(token)) { return parseInt(token); }

  if (token === 'true') return true;
  if (token === 'false') return false;

  if (token === 'nil') return types.nil;

  if (token.length >= 2 && token[0] === '"' && token[token.length - 1] === '"')
    return token.slice(1, -1);

  // symbol
  return Symbol.for(token);

}

module.exports = {
  read_str
}

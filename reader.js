
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

  if (tokens[0] === '(') {
    return read_list(tokens);
  }
  return read_atom(tokens);
}

function read_list(tokens) {
  let list = [];
  tokens.shift()

  while (true) {
    if (!tokens) { throw 'error'; }

    if (tokens[0] === ')') {
      tokens.shift();
      return list;
    }

    list.push(read_form(tokens))
  }
}

function read_atom(tokens) {
  let token = tokens.shift();

  if (!isNaN(token)) {
    token = parseInt(token);
  }
  return token;
}

module.exports = {
  read_str
}

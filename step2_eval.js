const readline = require('readline');

const reader = require('./reader');
const printer = require('./printer');
const {type} = require('./types');

function READ(x) {
  return reader.read_str(x);
}

function eval_ast(ast, env) {
  switch (type(ast)) {
    case 'list':
      return ast.map(each => EVAL(each, env));
    case 'symbol':
      return env[Symbol.keyFor(ast)];
    default:
      return ast;
  }
}

function EVAL(ast, env) {
  if (!Array.isArray(ast)) {
    return eval_ast(ast, env);
  } else if (ast.length === 0) {
    return ast;
  } else {
    let evaluated = eval_ast(ast, env);
    return evaluated[0].apply(null, evaluated.slice(1))
  }
}

function PRINT(x) {
  return printer.pr_str(x);
}


const repl_env = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => Math.floor(a / b)
};

function rep(x) {
  try {
    return PRINT(EVAL(READ(x), repl_env));
  } catch (e) {
    return e;
  }
}


const rl = readline.createInterface({
  terminal: process.env.TEST? false : true,
  input: process.stdin,
  output: process.stdout,
  prompt: 'user> '
});

rl.prompt();

rl.on('line', (input) => {
  const result = rep(input);
  console.log(result);

  rl.prompt();
});

const readline = require('readline');

const reader = require('./reader');
const printer = require('./printer');
const {type} = require('./types');
const { Env } = require('./env');
const { partition } = require('./utils');

function READ(x) {
  return reader.read_str(x);
}

function eval_ast(ast, env) {
  switch (type(ast)) {
    case 'list':
      return ast.map(each => EVAL(each, env));
    case 'symbol':
      return env.get(ast);
    default:
      return ast;
  }
}

function EVAL(ast, env) {
  if (!Array.isArray(ast)) { return eval_ast(ast, env); }
  if (ast.length === 0) { return ast; }

  let [a1, ...args] = ast;
  let [a2, a3] = args;
  switch (a1) {
    case 'def!':
      return env.set(a2, EVAL(a3, env));

    case 'let*':
      let letEnv = new Env(env);
      let pairs = partition(a2, 2);
      for (let [key, value] of pairs) {
        letEnv.set(key, EVAL(value, letEnv));
      }
      return EVAL(a3, letEnv);

    default:
      return EVAL(a1, env).apply(null, args.map((each) => EVAL(each, env)));
  }
}

function PRINT(x) {
  return printer.pr_str(x);
}


const repl_env = new Env(null);
repl_env.set('+', (a, b) => a + b);
repl_env.set('-', (a, b) => a - b);
repl_env.set('*', (a, b) => a * b);
repl_env.set('/', (a, b) => parseInt(a / b));

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

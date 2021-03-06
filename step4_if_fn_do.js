const readline = require('readline');

const reader = require('./reader');
const printer = require('./printer');
const {type, nil} = require('./types');
const { Env } = require('./env');
const { partition } = require('./utils');
const core = require('./core');

function READ(x) {
  return reader.read_str(x);
}

function eval_ast(ast, env) {
  switch (type(ast)) {
    case 'list':
    case 'vector':
      return ast.map(each => EVAL(each, env));
    case 'symbol':
      return env.get(ast);
    default:
      return ast;
  }
}

function EVAL(ast, env) {
  if (type(ast) !== 'list') { return eval_ast(ast, env); }
  if (ast.length === 0) { return ast; }

  let [a1, ...rest] = ast;
  let [a2, a3, a4] = rest;
  switch (type(a1) === 'symbol' && Symbol.keyFor(a1)) {
    case 'def!':
      return env.set(a2, EVAL(a3, env));

    case 'let*':
      let letEnv = new Env(env);
      let pairs = partition(a2, 2);
      for (let [key, value] of pairs) {
        letEnv.set(key, EVAL(value, letEnv));
      }
      return EVAL(a3, letEnv);

    case 'do':
      return eval_ast(rest, env).slice(-1).pop();

    case 'if':
      const condition = EVAL(a2, env);
      if (condition !== nil && condition !== false) {
        return EVAL(a3, env);
      }
      if (a4 !== undefined) { return EVAL(a4, env); }
      return nil;

    case 'fn*':
      return (...args) => {
        const localEnv = new Env(env, a2, args);
        return EVAL(a3, localEnv);
      };

    default:
      return EVAL(a1, env).apply(null, rest.map((each) => EVAL(each, env)));
  }
}

function PRINT(x) {
  return printer.pr_str(x);
}


const repl_env = new Env();
for (let [key, val] of Object.entries(core.ns)) {
  repl_env.set(Symbol.for(key), val);
}

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

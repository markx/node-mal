const readline = require('readline');
const reader = require('./reader')
const printer = require('./printer')

function READ(x) {
  return reader.read_str(x);
}

function EVAL(x) {
  return x;
}

function PRINT(x) {
  return printer.pr_str(x);
}

function rep(x) {
  try {
    return PRINT(EVAL(READ(x)));
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

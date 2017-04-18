const readline = require('readline');

function READ(x) {
  return x;
}

function EVAL(x) {
  return x;
}

function PRINT(x) {
  return x;
}

function rep(x) {
  return PRINT(EVAL(READ(x)));
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

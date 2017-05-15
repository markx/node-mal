
class Env {
  constructor(outer = null, binds = [], exprs = []) {
    this.outer = outer;
    this.data = {};

    binds.forEach((key, index)=> {
      this.set(key, exprs[index]);
    });
  }

  set(key, val) {
    return this.data[key] = val;
  }

  find(key) {
    let env = this;
    while (env) {
      if (key in env.data) { return env; }
      env = env.outer
    }
    return null
  }

  get(key) {
    const env = this.find(key);
    if (env) return env.data[key];

    throw `"${Symbol.keyFor(key)}" not found`;
  }
}


module.exports = {
  Env
}


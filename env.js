
class Env {
  constructor(outer) {
    this.outer = outer;
    this.data = {};
  }

  set(key, val) {
    return this.data[key] = val;
  }

  find(key) {
    if (key in this.data) return this;
    if (this.outer) return this.outer.find(key);
  }

  get(key) {
    const env = this.find(key);
    if (env) return env.data[key];

    throw `"${key}" not found`;
  }
}


module.exports = {
  Env
}


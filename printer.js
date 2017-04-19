
function pr_str(data) {
  if (Array.isArray(data)) {
    return `(${data.map(pr_str).join(' ')})`;
  }

  return data.toString();
}

module.exports = {
  pr_str
};




function partition(arr, size) {
  var result = [];
  for(var i = 0; i < arr.length; i++) {
    if (i % size === 0) result.push([]);
    result[result.length - 1].push(arr[i]);
  }
  return result;
}

module.exports = {
  partition
}

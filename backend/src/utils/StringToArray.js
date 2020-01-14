module.exports = function stringToArray(array) {
  return array.split(',').map(tech => tech.trim());
}
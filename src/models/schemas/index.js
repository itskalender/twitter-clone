const topLevelSchemas = require('./top-level');
const nestedSchemas   = require('./nested');

module.exports = {
  ...topLevelSchemas,
  ...nestedSchemas
}
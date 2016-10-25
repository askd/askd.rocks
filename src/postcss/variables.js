const processor = require('postcss-simple-vars');

const config = require('../config');

const variables = Object.assign(
  {},
  Object.keys(config.colors).reduce((vars, name) =>
    Object.assign(vars, { [`color-${name}`]: config.colors[name] })
  , {})
);

module.exports = processor({ variables });

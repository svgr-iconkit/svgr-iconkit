'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/cjs/index.js');
} else {
  module.exports = require('./lib/cjs/index.dev.js');
}

'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('../lib/native.cjs');
} else {
  module.exports = require('../lib/dev/native.cjs');
}

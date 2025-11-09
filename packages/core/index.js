'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/web.cjs');
} else {
  module.exports = require('./lib/dev/web.cjs');
}

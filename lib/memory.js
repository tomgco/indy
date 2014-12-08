var wrap = require('./util').wrap;
var os = require('os');

// System
exports.rss = wrap(process.memoryUsage().rss);
exports.total = wrap(os.totalmem());
exports.free = wrap(os.freemem());

// V8 Memory
exports.heapTotal = wrap(process.memoryUsage().heapTotal);
exports.heapUsed = wrap(process.memoryUsage().heapUsed);


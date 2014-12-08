var os = require('os');
var wrap = require('./util').wrap;

module.exports =
  { cpus: wrap(os.cpus()),
    loadavg5: wrap(os.loadavg()[0]),
    loadavg10: wrap(os.loadavg()[1]),
    loadavg15: wrap(os.loadavg()[2])
  };

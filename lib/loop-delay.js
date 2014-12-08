var Bench = require('./bench');

module.exports = function loopDelay(cb) {
  var bench = new Bench();
  setImmediate(function measure() {
    return cb(null, bench.elapsed());
  });
};

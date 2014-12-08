function Bench() {
  if (!(this instanceof Bench)) {
    return new Bench();
  }
  this.ts = 0;

  this.start();
}

Bench.prototype = {};

Bench.prototype.start = function () {
  this.ts = process.hrtime();
};

Bench.prototype.elapsed = function () {
  var ts = process.hrtime(this.ts);
  //     Secs into ms  + ns into ms
  return (ts[0] * 1e3) + (ts[1] / 1e6);
};

module.exports = Bench;

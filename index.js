var EventEmitter = require('events').EventEmitter;
var util = require('util');
var DefaultDispatcher = require('./lib/dispatcher');
var async = require('async');

var delay = require('./lib/loop-delay');
var memory = require('./lib/memory');
var GC = require('./lib/gc');
var cpu = require('./lib/cpu');

function Indy(options) {
  EventEmitter.call(this);

  this.options = options || {};
  this.dispatcher = this.options.dispatcher || new DefaultDispatcher();
  this.interval = this.options.interval || 10000; // in ms
  this.intervalRef = undefined;
  this.gc = new GC();
}

util.inherits(Indy, EventEmitter);

// Start watching for any events and publish them to our dispatcher.

Indy.prototype.whip = function () {
  this.gc.start();
  var self = this;
  var collect = function () {
    var metrics =
      { delay: delay,
        gcCount: self.gc.delta.bind(self.gc),
        memRss: memory.rss,
        memFree: memory.free,
        memTotal: memory.total,
        memHeapTotal: memory.heapTotal,
        memHeapUsed: memory.heapUsed,
        cpus: cpu.cpus,
        loadavg5: cpu.loadavg5,
        loadavg10: cpu.loadavg10,
        loadavg15: cpu.loadavg15
      };

    async.parallelLimit(metrics, 2, function (err, data) {
      if (err) {
        return;
      }
      self.dispatcher.dispatch(data);
    });
  };

  self.intervalRef = setInterval(collect, self.interval);
};

Indy.prototype.pause = function (done) {
  var self = this;
  if (!self.intervalRef) {
    return;
  }
  clearInterval(self.intervalRef);
  done();
};

Indy.prototype.resume = function () {
  if (this.intervalRef) {
    return;
  }
  this.whip();
};

module.exports = Indy;

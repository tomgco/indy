var EventEmitter = require('events').EventEmitter;
var v8 = new EventEmitter();

try {
  v8 = require('tracing').v8;
  if (!process.env.NODE_ENV) {
    v8.setMaxListeners(0);
  }
} catch (e) {
  console.log('Failed to load v8, not collecting GC information');
}

// TODO: Need to decide on if we should do some internal buffering of the
// object, or just send the last gc event since the last probe.
// Most likely the latter as under high loads we don't want artefact or indy
// to exacerbate an issue.
function V8Gc() {
  if (!(this instanceof V8Gc)) {
    return new V8Gc();
  }
  this.count = 0;
  this.started = false;
  this.start();
}

V8Gc.prototype.start = function () {
  if(this.started) {
    return false;
  }
  this.started = true;

  var self = this;
  // need to ensure we don't over use this.
  // possible major performance bottle-neck.
  v8.on('gc', function onGC(before, after) {
    // we need to be super defensive here against changing v8 versions.
    // and breaking api changes to that subsystem.

    self.count++;
    // undefined behaviour on the first gc.
    // bail out early.
    if (!before || !after) {
      return false;
    }

    // increment gc counter.
    // notify what gc occured.
    // send gc sizes.

    // This is very handy to check that a large gc has occured
    // and has caused a significant load on the CPU.

  });

};

V8Gc.prototype.reset = function () {
  this.count = 0;
};

V8Gc.prototype.delta = function (cb) {
  var delta = this.count;
  this.count = 0;
  return cb(null, delta);
};

module.exports = V8Gc;

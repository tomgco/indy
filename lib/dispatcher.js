var EventEmitter = require('events').EventEmitter;
var util = require('util');

function DefaultDispatcher(options) {
  if (!(this instanceof DefaultDispatcher)) {
    return new DefaultDispatcher(options);
  }
  EventEmitter.call(this);

  this.options = options || {};
}

util.inherits(DefaultDispatcher, EventEmitter);

DefaultDispatcher.prototype.dispatch = function (obj) {
  process.stdout.write(JSON.stringify(obj, true, 2));
};

module.exports = DefaultDispatcher;

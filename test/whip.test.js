var Indy = require('..');
var assert = require('assert');

describe('#whip', function () {
  var indy = {};

  afterEach(function (done) {
    indy = {};
    done();
  });

  describe('Loop Delay', function () {

    it('should measure the delay on the eventloop', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              isDone = true;
              assert(metric.delay > 0);
              done();
            }
          }
        }
      });
      indy.whip();
    });
  });

  describe('GC', function () {
    var method = global.gc ? it : it.skip;
    method('should capture gc events', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.gcCount > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
      global.gc();
    });
  });

  describe('Memory', function () {
    it('should report rss memory', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.memRss > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });
    it('should report free memory', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.memFree > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });
    it('should report total memory', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.memTotal > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });
    it('should report gc memory heap total', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.memHeapTotal > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });
    it('should report gc memory heap usage', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.memHeapUsed > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });
  });

  describe('CPU', function () {
    it('should report information on every CPU', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.cpus[0].times.user > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });

    it('should report information on 5 minute load average', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.loadavg5 > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });

    it('should report information on 10 minute load average', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.loadavg10 > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });

    it('should report information on 15 minute load average', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.loadavg15 > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });
    it('should report information on every CPU', function (done) {
      var isDone = false;
      indy = new Indy({ interval: 1, dispatcher:
        { dispatch: function (metric) {
            if (!isDone) {
              assert(metric.cpus[0].times.user > 0);
              isDone = true;
              done();
            }
          }
        }
      });
      indy.whip();
    });
  });

});

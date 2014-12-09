# Indy

Fancy having your own Dr. Henry Walton "Indiana" Jones, Jr? Now you can!


```javascript

var Indy = require('indy');

var indy = new Indy();

// Defaults to our artefact custom event dispatcher.
// Times eventloop delay, process info, memory info, etc.
indy.whip( { /* dispatcher: new StatsD() */  } );

// Not sure why you would need it yet but, lets just see.
indy.pause();
indy.resume();

// Dumps a metric shit-ton of things, memory, core, yada yada ya.
// Breaks things, blocks the eventloop etc. not fun.
indy.extract(); // heart!

// We always forget this!
indy.hat();

```

The default dispatcher will log the example output using console.log as an example. A statsd version of this is available at [tomgco/indy-statsd](http://github.com/tomgco/indy-statsd) to use, or to base off of your own metrics sink hole.

```javascript
var StatsdIndy = require('indy-statsd');
indy.whip({ dispatcher: new StatsdIndy() });
```

## Example output from the default dispatcher

```json5
{
  "gccount": 0, // delta of gc counts between each capture
  "memrss": 18083840, // bytes
  "memfree": 721039360, // bytes
  "memtotal": 4076998656, // bytes
  "memheaptotal": 14519296, // bytes
  "memheapused": 5660016, // bytes
  "cpus": [
    {
      "model": "intel(r) core(tm) i5-3427u cpu @ 1.80ghz",
      "speed": 800, // Mhz
      "times": {
        "user": 11770900, // ms
        "nice": 1509700, // ms
        "sys": 4852500, // ms
        "idle": 44234800, // ms
        "irq": 700
      }
    },
    {
      "model": "intel(r) core(tm) i5-3427u cpu @ 1.80ghz",
      "speed": 800,
      "times": {
        "user": 9865300,
        "nice": 1292400,
        "sys": 4128400,
        "idle": 48376000,
        "irq": 0
      }
    },
    {
      "model": "intel(r) core(tm) i5-3427u cpu @ 1.80ghz",
      "speed": 800,
      "times": {
        "user": 11763300,
        "nice": 1567500,
        "sys": 5049500,
        "idle": 42676900,
        "irq": 0
      }
    },
    {
      "model": "intel(r) core(tm) i5-3427u cpu @ 1.80ghz",
      "speed": 1000,
      "times": {
        "user": 9685200,
        "nice": 1140400,
        "sys": 4383000,
        "idle": 45695100,
        "irq": 0
      }
    }
  ],
  "loadavg5": 0.6865234375,
  "loadavg10": 1.10400390625,
  "loadavg15": 1.39208984375,
  "delay": 3.174327 //ms
}
```

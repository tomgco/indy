exports.wrap = function wrap(result) {
  return function wrappedFn(cb) {
    return cb(null, result);
  };
};

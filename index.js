var RJSS = require('rjss');
var loaderUtils = require('loader-utils');

var rjss;

module.exports = function(source) {
  this.cacheable && this.cacheable();

  if (!rjss) {
    rjss = new RJSS({sourceMap: true});
  }

  var sourceFilename = loaderUtils.getRemainingRequest(this);
  var current = loaderUtils.getCurrentRequest(this);

  var transform = rjss.parseContentSync(source, {
    path: this.resource
  });

  var sourceMap = JSON.parse(transform.getSourceMap());

  if (sourceMap) {
    sourceMap.sources = [sourceFilename];
    sourceMap.file = current;
    sourceMap.sourcesContent = [source];
  }
  this.callback(null, transform.getCode(), sourceMap);
};

'use strict';

/**
 * Module dependencies.
 */

var integration = require('@segment/analytics.js-integration');
var isObject = require('isobject');

/**
 * Expose `Atatus` integration.
 */

var Atatus = module.exports = integration('Atatus')
  .global('atatus')
  .option('apiKey', '')
  .option('enableSourcemap', false)
  .option('disableAjaxMonitoring', false)
  .tag('<script src="//dmc1acwvwny3.cloudfront.net/atatus.js">');

/**
 * Initialize.
 *
 * https://www.atatus.com/docs.html
 *
 * @api public
 */

Atatus.prototype.initialize = function() {
  var self = this;

  this.load(function() {
    var configOptions = {
      enableSourcemap: self.options.enableSourcemap,
      disableAjaxMonitoring: self.options.disableAjaxMonitoring
    };

    // Configure Atatus and install default handler to capture uncaught
    // exceptions
    window.atatus.config(self.options.apiKey, configOptions).install();
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

Atatus.prototype.loaded = function() {
  return isObject(window.atatus);
};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} identify
 */

Atatus.prototype.identify = function(identify) {
  window.atatus.setCustomData({ person: identify.traits() });
};

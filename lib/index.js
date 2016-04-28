
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var is = require('is');

/**
 * Expose `Atatus` integration.
 */

var Atatus = module.exports = integration('Atatus')
  .global('atatus')
  .option('apiKey', '')
  .option('enableSourcemap', false)
  .option('disableAjaxMonitoring', false)
  .option('allowedDomains', '')
  .option('enableOffline', false)
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

    // Set allowed domains and enable offline
    if (self.options.allowedDomains) {
      window.atatus.setAllowedDomains(self.options.allowedDomains.split(','));
    }
    window.atatus.enableOffline(!!self.options.enableOffline);

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
  return is.object(window.atatus);
};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} identify
 */

Atatus.prototype.identify = function(identify) {
  var uid = identify.userId();
  if (uid) {
    window.atatus.setUser(uid);
  }
  window.atatus.setCustomData({ person: identify.traits() });
};

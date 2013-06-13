/* Index file. */

define(['app/namespace', 'thorax', 'modernizr'], function(Application, Thorax) {
  // Declare vars.
  var compatible, init;

  // Check compatibility.
  compatible = function compatible() {
    var really = Modernizr.localstorage && JSON;
    delete Modernizr;

    return really;
  }

  // Allows load:end and load:start events to propagate
  // to the application object
  Thorax.setRootObject(Application);

  // Hell yeah!
  init = function init() {
    // Reject incompatible devices
    if(!compatible()) {
      alert('Oops! Seems like your device isn\'t compatible..');
      return false;
    }

    var $, Backbone;

    // Load libs.
    Backbone = Application.libs.Backbone;

    Backbone.history.start({
      pushState: false,
      root: '/',
      silent: true
    });

    // Application.template = Thorax.templates.application;
    // Application.appendTo('body');

    Backbone.history.loadUrl();
  }

  // Exports
  return init;
});

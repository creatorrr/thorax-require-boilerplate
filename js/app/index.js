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

  // Allows load:end and load:start events to propagate.
  // to the application object.
  Thorax.setRootObject(Application);

  // Hell yeah!
  init = function init() {
    // Reject incompatible devices.
    if(!compatible()) {
      alert('Oops! Seems like your device isn\'t compatible..');
      return false;
    }

    var $, Backbone;

    // Load libs.
    $ = Application.libs.$;
    Backbone = Application.libs.Backbone;

    // Start Backbone history.
    Backbone.history.start({
      pushState: true,
      root: '/',
      silent: true
    });

    // Render template.
    // Application.template = Thorax.templates.application;
    // Application.appendTo('body');

    // Dispatch.
    Backbone.history.loadUrl();

    // Setup a[href] pushstate listeners
    $(document).on('click', 'a:not([data-bypass])', function(e) {
      var href, protocol;

      // Get the anchor href and protocol.
      href = $(this).prop('href');
      protocol = this.protocol;

      // Ensure relative url.
      if(href && href.slice(0, protocol.length) !== protocol) {
        e.preventDefault();

        // Application.router.navigate(href, {trigger: true});
      }
    });
  }

  // Exports
  return init;
});

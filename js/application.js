/* Application init. */

// Start application.
require(['app/namespace', 'app/index'], function(Application, init) {
  var $ = Application.libs.$;

  $(init);
});

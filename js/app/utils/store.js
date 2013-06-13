/* Storage */

define(['store'], function(store) {
  // Declare vars.
  var Store;

  // Define Store class.
  Store = function Store(namespace) {
    if(typeof namespace === 'undefined') throw new Error('Invalid namespace');

    this.namespace = namespace + '';
    return this;
  }

  Store.prototype.get = function get(key) {
    // Namespace key.
    key = this.namespace + this.separator + key;
    return store.get(key);
  }

  Store.prototype.set = function set(key, value) {
    // Unpack value if first arg is an object.
    if(key === Object(key)) {
      value = key[Object.keys(key)[0]];
      key = Object.keys(key)[0];
    }

    key = this.namespace + this.separator + key;
    return store(key, value);
  }

  return Store;
});

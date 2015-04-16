var Router = require('./router.js');

var app = {
  initialise: function() {
    /*
      Loads user cache and categories.json.
      Initalises the Router.
    */

    // TODO Check in user cache for an event for today
    //      and show a specific button for that.

    // TODO Load categories from server. They are needed
    //      for any operation.

    new Router();
  }

};

module.exports = app;

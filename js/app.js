var view = require('./view.js');

var app = {
    initialise: function() {
        // TODO Check in user cache for an event for today
        //      and show a specific button for that.

        // TODO Load categories from server. They are needed
        //      for any operation.

        view.loadHome();

    },
};

module.exports = app;

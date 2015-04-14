var Router = require('./router.js'),
    newEvent = require('./newevent.js');


var app = {

    view: 'home',

    initialise: function() {

        var newPath = Router.getPath(),
            loadPathData = this.loadPathData;

        loadPathData(newPath);

        window.addEventListener('hashchange', function() {
            newPath = Router.getPath();
            loadPathData.call(app, newPath);
        }, false);
    },

    loadPathData: function(path) {
        switch(path) {
            case 'addEvent':
                newEvent.loadNewEventData();
                break;
            default:
                return;
        }
    },

};

module.exports = app;

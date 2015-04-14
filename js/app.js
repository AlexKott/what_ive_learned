var Router = require('./router.js'),
    createEvent = require('./create_event.js'),
    showEvents = require('./show_events.js');


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
            case 'add-event':
                createEvent.initNewEvent();
                break;
            case 'show-events':
                showEvents.initialise();
                break;
            default:
                return;
        }
    },

};

module.exports = app;

var subjects = require('./content/subjects.js');
var events = require('./content/events.js');


var app = {
    readEvents: function() {
        for (var k in events) {
            document.querySelector('#main').innerText = events[k].primary.description;
        }
    }
};


module.exports = app;

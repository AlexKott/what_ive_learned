var events = require('./content/events.js');

var LearnEvent = function(date, fields) {
    this.fields = fields;

    if(date === null) {
        var newDate = new Date();
        date = newDate.getFullYear().toString().concat(newDate.getMonth(), newDate.getDate());
    }

    this.date = date;

    if (events[date] !== undefined) {
        throw new Error('NOT POSSIBLE TO ADD NEW EVENT');
    }

    else {
        events[date] = this.fields;
    }

    LearnEvent.prototype = {
        delete: function(date) {
            if(events[date] === undefined) {
                throw new Error('NOT POSSIBLE TO DELETE EVENT');
            }
            else {
                delete events[date];
            }
        },
    };


};


module.exports = LearnEvent;

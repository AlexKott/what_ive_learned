var categories = require('./content/categories.js'),
    events = require('./content/events.js');


var showEvents = {
    initialise: function() {

        document.querySelector('#show-events').innerHTML = '';

        for (var date in events) {
            this.displayEvent(date);
        }
    },

    displayEvent: function(date) {
        var section = document.querySelector('#show-events'),
            tmpl = document.querySelector('#event-template'),
            newEvent = tmpl.content.cloneNode(true),
        // primary event only
            isMilestone = events[date].primary.isMilestone,
            category = events[date].primary.category,
            subject = events[date].primary.subject,
            description = events[date].primary.description,
            cColor = categories[category].color,
            sColor = categories[category].subjects[subject].color;


        newEvent.querySelector('.show-single-event').style.border = '5px solid #' + cColor;
        newEvent.querySelector('.show-single-event').style.backgroundColor = '#' + sColor;
        newEvent.querySelector('.show-date').innerText = date;
        newEvent.querySelector('.show-category').innerText = category;
        newEvent.querySelector('.show-subject').innerText = subject;
        newEvent.querySelector('.show-description').innerText = description;

        section.appendChild(newEvent);

    }

};

module.exports = showEvents;

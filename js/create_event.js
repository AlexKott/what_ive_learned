var learnEvent = require('./learn_event.js'),
    category = require('./category.js'),
    view = require('./view.js');

var createEvent = {

    newEvent: {
        date: 0,
        type: 'primary',
        fields: {}
    },

    getDate: function() {
        this.newEvent.date = learnEvent.prototype.transformDate(new Date());
        return this.newEvent.date;
    },

    submitEvent: function() {
        // setup event for saving
        var date, eventList, eventListLength, type, fields = {}, i;

        date = this.learnDate;

        eventList = document.querySelectorAll('.new-event');
        eventListLength = eventList.length;

        if (this.secondaryOnly) i = 1;
        else i = 0;

        for (i; i < eventListLength; i++) {
            if (i === 0) {
                type = 'primary';
                fields.isMilestone = eventList[0].querySelector('.new-milestone').checked;
            }
            else {
                type = 'secondary';
                fields.isMilestone = false;
            }
            fields.category = eventList[i].querySelector('.new-category')
                .options[eventList[i].querySelector('.new-category').selectedIndex]
                .value;
            fields.subject = eventList[i].querySelector('.new-subject')
                .options[eventList[i].querySelector('.new-subject').selectedIndex]
                .value;
            fields.description = eventList[i].querySelector('.new-description').value;

            try {
                new LearnEvent(date, type, fields);
            }
            catch(error) {
                alert(error);
            }
        }


    }
};


module.exports = createEvent;

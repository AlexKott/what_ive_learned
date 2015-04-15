var LearnEvent = require('./learn_event.js'),
    category = require('./category.js'),
    view = require('./view.js');

var createEvent = {

    newEvent: {
        date: 0,
        type: 'primary'
    },

    getDate: function() {
        this.newEvent.date = LearnEvent.prototype.transformDate(new Date());
        return this.newEvent.date;
    },

    submitEvent: function() {
        var date, type, fields = {};

        date = this.newEvent.date;
        type = this.newEvent.type;

        fields.category = document.querySelector('#new-cat-list>li.active').innerText;
        fields.subject = document.querySelector('#new-sub-list>li.active').innerText;
        fields.description = document.querySelector('#new-description>input[type="text"]').value;


        try {
            new LearnEvent(date, type, fields);
            return true;
        }
        catch(error) {
            alert(error);
            return false;
        }
    }
};


module.exports = createEvent;

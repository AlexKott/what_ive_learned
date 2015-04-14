var events = require('./content/events.js');
var categories = require('./content/categories.js');

var LearnEvent = function(date, type, fields) {
    if (fields === undefined) {
        throw new Error('No valid event data submitted!');
    }
    else {
        this.fields = this.checkFields(fields);
    }

    this.type = type;

    if (this.fields.isMilestone === true && this.type !== 'primary') {
        throw new Error('Secondary events cannot be milestones!');
    }

    if(!date) {
        throw new Error('Date missing!');
        /* var newDate = new Date(),
            year = newDate.getFullYear(),
            month = ('0' + (newDate.getMonth() + 1)).slice(-2),
            day = ('0' + newDate.getDate()).slice(-2);
            date = year.toString() + month + day;
        */
    }

    this.date = date;

    if (events[date] === undefined) {
        events[date] = {};
    }
    if (this.type === 'primary') {
        if (events[date].primary !== undefined) {
            throw new Error('There is already a primary learn event defined for this day!');
        }
        else {
            events[date].primary = this.fields;
        }
    }

    else {
        if(events[date].primary === undefined) {
            var changeSec = confirm('You need a primary learn event to continue. Do you want to make the first of your secondary events a primary event?');

            if (!changeSec) { return; }
            else {
                events[date].primary = this.fields;
                return;
            }
        }
        if(events[date].secondary === undefined) {
            events[date].secondary = [];
        }
        events[date].secondary.push(this.fields);
    }
};

LearnEvent.prototype.checkFields = function(fieldData) {

    // checking fieldData for invalid input

    if (fieldData.category === undefined ||
        fieldData.subject === undefined ||
        fieldData.description === undefined) {
        throw new Error('Event data is not complete!');
    }

    if (fieldData.isMilestone === undefined) {
        fieldData.isMilestone = false;
    }

    if (categories[fieldData.category] === undefined) {
        throw new Error('This category does not exist yet!');
    }

    if (categories[fieldData.category].subjects[fieldData.subject] === undefined) {
        throw new Error('This subject does not exist yet!');
    }

    if(fieldData.description === undefined || fieldData.description === '') {
        throw new Error('Description for this event is missing!');
    }

    return fieldData;
};

LearnEvent.prototype.delete = function(date) {
    if(events[date] === undefined) {
        throw new Error('There is no event for the given date!');
    }
    else {
        delete events[date];
    }
};

module.exports = LearnEvent;

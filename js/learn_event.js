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
        var newDate = new Date(),
            year = newDate.getFullYear(),
            month = ('0' + (newDate.getMonth() + 1)).slice(-2),
            day = ('0' + newDate.getDate()).slice(-2);
            date = year.toString() + month + day;
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
        events[date].secondary = this.fields;
    }
};

LearnEvent.prototype.delete = function(date) {
    if(events[date] === undefined) {
        throw new Error('There is no event for the given date!');
    }
    else {
        delete events[date];
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

    if(fieldData.description === undefined) {
        throw new Error('Description for this event is missing!');
    }

    return fieldData;
};

module.exports = LearnEvent;

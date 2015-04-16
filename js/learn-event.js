var events = require('./content/events.js');
var categories = require('./content/categories.js');

var LearnEvent = function(date, fields) {

  /*
    Checking for valid input
  */

  if (!date) { throw new Error('Date missing!'); }
  else { this.date = date; }

  if (!fields) { throw new Error('No valid event data submitted!'); }
  else { this.fields = this.checkFields(fields); }

  if (!events[date]) { events[date] = []; }

  events[date].push(this.fields);

};

LearnEvent.prototype.checkFields = function(fieldData) {
  /*
    These errors shouldn't occur, since data input was already checked.
  */
  if(!fieldData.description || fieldData.description.trim() === '') {
    throw new Error('Description for this event is missing!');
  }
  if (!fieldData.category || !fieldData.subject) {
    throw new Error('Event data is not complete!');
  }
  if (!categories[fieldData.category]) {
    throw new Error('This category does not exist yet!');
  }
  if (!categories[fieldData.category].subjects[fieldData.subject]) {
    throw new Error('This subject does not exist yet!');
  }
  if (!fieldData.isMilestone) { fieldData.isMilestone = false; }

  return fieldData;
};

LearnEvent.prototype.delete = function(date) {
  if(!events[date]) { throw new Error('There is no event for the given date!'); }

  else { delete events[date]; }
};

LearnEvent.prototype.transformDate = function(date) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    var year = date.getFullYear().toString(),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
      newDate = year + month + day;
  }
  else {
    // TODO: transform to date
  }

  return newDate;
};

LearnEvent.prototype.getEvents = function() {
  // TODO: specify how many events, from which file etc...

  return events;

};

LearnEvent.prototype.getCategories = function() {
  return categories;
};


module.exports = LearnEvent;

var dataControl = require('./data-control.js');

var LearnEvent = function(date, fields) {

  /*
    Checking for valid input
  */

  var events = dataControl.events;

  if (!date) { throw new Error('Date missing!'); }
  else { this.date = date; }

  if (!fields) { throw new Error('No valid event data submitted!'); }
  else { this.fields = this.checkFields(fields); }

  if (!events) { events = {}; }

  if (!events[date]) { events[date] = []; }

  events[date].push(this.fields);

  //dataControl.saveToJson('events');

};

LearnEvent.prototype.checkFields = function(fieldData) {
  /*
    These errors shouldn't occur, since data input was already checked.
  */
  if(!fieldData.description || fieldData.description.trim() === '') {
    throw new Error('Description for this event is missing!');
  }
  if (!fieldData.category || !fieldData.subject) {
    throw new Error('Event data is not complete! \nCategory: ' + fieldData.category + '\nSubject: ' + fieldData.subject);
  }
  if (!dataControl.categories[fieldData.category]) {
    throw new Error('This category does not exist yet: ' + fieldData.category);
  }
  if (!dataControl.categories[fieldData.category].subjects[fieldData.subject]) {
    throw new Error('This subject does not exist yet: ' + fieldData.subject);
  }
  if (!fieldData.isMilestone) { fieldData.isMilestone = false; }

  return fieldData;
};

LearnEvent.prototype.delete = function(date) {
  if(!dataControl.events[date]) { throw new Error('There is no event for the given date!'); }

  else { delete dataControl.events[date]; }
};

LearnEvent.prototype.transformDate = function(date) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    var year = date.getFullYear().toString(),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
      newDate = year + month + day;
  }

  return newDate;
};

LearnEvent.prototype.getEvents = function() {
  // TODO: specify how many events, from which file etc...

  return dataControl.events;

};

LearnEvent.prototype.getCategories = function() {
  return dataControl.categories;
};


module.exports = LearnEvent;

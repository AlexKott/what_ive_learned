var events = require('./content/events.js');
var categories = require('./content/categories.js');

var LearnEvent = function(date, type, fields) {

  /*
    Checking for valid input
  */

  if (!date) { throw new Error('Date missing!'); }
  else { this.date = date; }

  if (!type) { throw new Error('Type missing!'); }
  else { this.type = type; }

  if (!fields) { throw new Error('No valid event data submitted!'); }
  else { this.fields = this.checkFields(fields); }

  if (this.fields.isMilestone === true && this.type !== 'primary') {
    throw new Error('Secondary events cannot be milestones!');
  }

  /*
    Creating a new entry in the database and
    checking for valid primary or secondary entry
  */

  if (this.type === 'primary') {
    // TODO Continue with type = secondary
    if (events[date]) { throw new Error('There is already a primary learn event defined for this day!'); }
    else { events[date] = { 'primary': this.fields }; }
  }

  else {
    // Setting the type to primary, because no event exists yet
    if (!events[date]) { events[date] = { 'primary': this.fields }; }

    else if (!events[date].secondary) { events[date].secondary = [this.fields]; }

    else { events[date].secondary.push(this.fields); }
  }

};

LearnEvent.prototype.checkFields = function(fieldData) {

  // TODO: Replace error throwing with something more elegant

  if (!fieldData.category || !fieldData.subject) {
    throw new Error('Event data is not complete!');
  }

  if(!fieldData.description || fieldData.description.trim() === '') {
    throw new Error('Description for this event is missing!');
  }

  if (!categories[fieldData.category]) {
    throw new Error('This category does not exist yet!');
  }

  if (!categories[fieldData.category].subjects[fieldData.subject]) {
    throw new Error('This subject does not exist yet!');
  }

  if (fieldData.isMilestone === undefined) { fieldData.isMilestone = false; }

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

module.exports = LearnEvent;

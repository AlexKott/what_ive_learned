var LearnEvent = require('./learn-event.js'),
    category = require('./category.js'),
    subject = require('./subject.js');

var ShowEvent = function() {
  var events = LearnEvent.prototype.getEvents(),
      categories = LearnEvent.prototype.getCategories();

};

ShowEvent.prototype.resetData = function() {
  // TODO
};

module.exports = ShowEvent;

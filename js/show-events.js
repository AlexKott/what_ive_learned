var uiQuery = require('./ui-query.js'),
    LearnEvent = require('./learn-event.js'),
    category = require('./category.js'),
    subject = require('./subject.js');

var ShowEvent = function() {
  this.events = LearnEvent.prototype.getEvents();
  this.categories = LearnEvent.prototype.getCategories();

  this.presentEventDates = function() {
    var tpl = document.querySelector('#show-single-event-tpl'),
        evs = this.events,
        newEv, evList, evListLength;

    for (var eDate in evs) {
      newEv = tpl.content.cloneNode(true);

      newEv.querySelector('.show-date').innerText = eDate;

      evList = this.presentEventList(eDate);
      evListLength = evList.length;

      for (var i = 0; i < evListLength; i++) {
        newEv.querySelector('.show-event-list').appendChild(evList[i]);
      }

      document.querySelector('#show-events').appendChild(newEv);
    }
  };

  this.presentEventList = function(eDate) {
    var evList = [],
        oneEv;
    this.events[eDate].forEach(function(ev) {
      oneEv = document.createElement('LI');
      oneEv.innerText = 'In: ' + ev.category + ', ' + ev.subject + ': ' + ev.description;

      evList.push(oneEv);
    });

    return evList;
  };

  this.presentEventDates();

};

ShowEvent.prototype.resetData = function() {
  var show = document.querySelector('#show-events');

  while (show.querySelector('.show-single-event')) {
    show.removeChild(show.lastChild);
  }

};

module.exports = ShowEvent;

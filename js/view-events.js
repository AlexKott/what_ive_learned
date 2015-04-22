var uiQuery = require('./ui-query.js'),
    LearnEvent = require('./learn-event.js');

var ViewEvent = function() {
  this.events = LearnEvent.prototype.getEvents();
  this.categories = LearnEvent.prototype.getCategories();

  this.setCurrentMonth = function() {
    // TODO load json of current month

    var date = new Date(),
        year = date.getFullYear(),
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthName = months[date.getMonth()];

        document.querySelector('#view-events .header-date').innerText = monthName + ' ' + year;

  };

  this.presentLearnEvents = function() {
    var tpl = document.querySelector('#show-single-event-tpl'),
        svg = [
                document.querySelector('#svg-square-0'),
                document.querySelector('#svg-square-1'),
                document.querySelector('#svg-square-2'),
                document.querySelector('#svg-square-3')
              ],
        evs = this.events,
        evsLength, newEv, singleEv, rnd, squareEl, milestoneBadge;

    for (var eDate in evs) {
      evsLength = evs[eDate].length;

      for (var i = 0; i < evsLength; i++) {
        newEv = tpl.content.cloneNode(true);
        singleEv = newEv.querySelector('.show-single-event');

        if (i === 0) { // first event of a day gets an indicator
          singleEv.className += ' show-first-event';
          singleEv.querySelector('p').innerText = eDate.substring(6, 8); // get the day
        }

        // add a random square
        rnd = Math.floor(Math.random() * 4);
        squareEl = svg[rnd].content.cloneNode(true);

        squareEl = this.applyColors(squareEl, evs[eDate][i].category, evs[eDate][i].subject);

        singleEv.appendChild(squareEl);

        if (evs[eDate][i].isMilestone) {
          milestoneBadge = document.createElement('DIV');
          milestoneBadge.className = 'milestone';
          singleEv.appendChild(milestoneBadge);
        }

        // add a retrievable data-index
        singleEv.dataset.index = eDate+i;

        document.querySelector('#present-events').appendChild(newEv);
      }
    }
  };

  this.applyColors = function(el, cat, sub) {
    var paths = el.querySelectorAll('path'),
        strokeColor = this.categories[cat].color,
        fillColor = this.categories[cat].subjects[sub].color;
    paths[0].style.fill = 'rgb(' + fillColor.r + ',' + fillColor.g + ',' + fillColor.b + ')';
    paths[1].style.fill = 'rgb(' + strokeColor.r + ',' + strokeColor.g + ',' + strokeColor.b + ')';
    return el;
  };

  this.setCurrentMonth();
  this.presentLearnEvents();

};

ViewEvent.prototype.resetData = function() {
  var show = document.querySelector('#present-events');

  while (show.querySelector('.show-single-event')) {
    show.removeChild(show.lastChild);
  }

};

module.exports = ViewEvent;

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
    var svg = [
                document.querySelector('#svg-square-0'),
                document.querySelector('#svg-square-1'),
                document.querySelector('#svg-square-2'),
                document.querySelector('#svg-square-3')
              ],
        evs = this.events,
        evsLength, newEv, newDate, rnd, squareEl, milestoneBadge;

    for (var eDate in evs) {
      evsLength = evs[eDate].length;

      for (var i = 0; i < evsLength; i++) {
        newEv = document.createElement('DIV');
        newEv.className = 'show-single-event';
        newDate = document.createElement('P');

        if (i === 0) { // first event of a day gets an indicator
          newEv.className += ' show-first-event';
          newDate.innerText = eDate.substring(6, 8); // get the day
        }

        newEv.appendChild(newDate);

        // add a random square
        rnd = Math.floor(Math.random() * 4);
        squareEl = svg[rnd].content.cloneNode(true);

        squareEl = this.applyColors(squareEl, evs[eDate][i].category, evs[eDate][i].subject);

        newEv.appendChild(squareEl);

        if (evs[eDate][i].isMilestone) {
          milestoneBadge = document.createElement('DIV');
          milestoneBadge.className = 'milestone-badge';
          newEv.appendChild(milestoneBadge);
        }

        // add a retrievable data-index
        newEv.dataset.index = eDate+i;

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

  this.setActiveEvent = function(el) {
    var footer = document.querySelector('#view-footer'),
        oldActive, date, val, ev;

    // NOTE the single = is correct here!
    if (oldActive = document.querySelector('.show-single-event.active')) {
      oldActive.className = oldActive.className.replace(' active', '');
    }
    el.className += ' active';

    if (footer.className.indexOf('milestone-badge')) {
      footer.className = footer.className.replace(' milestone-badge', '');
    }

    date = el.dataset.index.slice(0, 8);
    val = el.dataset.index.slice(8);

    ev = this.events[date][val];

    if (ev.isMilestone) {
      footer.className += ' milestone-badge';
    }

    footer.querySelector('.view-cat-sub').innerText = ev.category + ' - ' + ev.subject;
    footer.querySelector('.view-description').innerText = ev.description;

  };

  this.setupEventListener = function() {
    var selectEvent = function(e) {
      var node = e.target, cName, oldActive;

      while (node !== null) {
        cName = node.className.toString();
        if (cName.indexOf('show-single-event') === -1) {
          node = node.parentNode;
          continue;
        }
        else if (cName.indexOf(' active') !== -1) {
          break;
        }
        else {
          this.setActiveEvent(node);
        }
      }
    }.bind(this);

    document.querySelector('#present-events').addEventListener(uiQuery.clickAction, selectEvent);
  };

  this.setCurrentMonth();
  this.presentLearnEvents();
  this.setupEventListener();

};

ViewEvent.prototype.resetData = function() {
  var show = document.querySelector('#present-events'),
      footer = document.querySelector('#view-footer'),
      newShow;

  while (show.querySelector('.show-single-event')) {
    show.removeChild(show.lastChild);
  }

  newShow = show.cloneNode(true);
  show.parentNode.replaceChild(newShow, show);

  Array.prototype.forEach.call(footer.childNodes, function(node) {
    node.innerHTML = '';
  });
  footer.className = 'footer';

};

module.exports = ViewEvent;

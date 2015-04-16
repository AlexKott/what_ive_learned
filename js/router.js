var CreateEvent = require('./create-event.js'),
    ShowEvent = require('./show-events.js');

var Router = function() {
  var self = this,
      hash;

  // TODO With ES6 this will become a new Set()
  this.pages = {
    'new-event':true,
    'show-events':true
  };

  this.loadView = function(path) {
    var pages = document.querySelectorAll('.page'),
        pagesLength = pages.length;

    switch (path) {
      case 'new-event':
        if (this.currentView) { this.currentView.resetData(); }
        this.currentView = new CreateEvent();
        break;
      case 'show-events':
        if (this.currentView) { this.currentView.resetData(); }
        this.currentView = new ShowEvent();
        break;
      default:
        if (this.currentView) {
          this.currentView.resetData();
          delete this.currentView;
        }
    }


    for (var i = 0; i < pagesLength; i++) {
      if (pages[i].id === path) {
        pages[i].style.display = 'block';
      }
      else {
        pages[i].style.display = 'none';
      }
    }
  };

  this.getHash = function() {
    hash = window.location.hash.replace('#', '');
    if (self.pages[hash]) {
      self.loadView(hash);
    }
    else {
      self.loadView('home');
    }
  };

  self.getHash();

  window.addEventListener('hashchange', function() {
    self.getHash();
  }, false);

};

module.exports = Router;

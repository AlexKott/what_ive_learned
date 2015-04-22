var CreateEvent = require('./create-event.js'),
    ViewEvent = require('./view-events.js');

var Router = function() {
  var self = this,
      hash;

  // TODO With ES6 this will become a new Set()
  this.pages = {
    'new-event':true,
    'view-events':true
  };

  this.loadView = function(path) {
    var pages = document.querySelectorAll('.page'),
        pagesLength = pages.length;

    switch (path) {
      case 'new-event':
        if (this.currentView) { this.currentView.resetData(); }
        document.querySelector('html').style.overflow = 'hidden';
        this.currentView = new CreateEvent();
        break;
      case 'view-events':
        if (this.currentView) { this.currentView.resetData(); }
        document.querySelector('html').style.overflow = 'scroll';
        this.currentView = new ViewEvent();
        break;
      default:
        if (this.currentView) {
          this.currentView.resetData();
          delete this.currentView;
        }
        document.querySelector('html').style.overflow = 'hidden';
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

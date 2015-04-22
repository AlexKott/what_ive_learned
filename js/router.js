var CreateEvent = require('./create-event.js'),
    ViewEvent = require('./view-events.js'),
    uiQuery = require('./ui-query');

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
        pagesLength = pages.length,
        self = this;

    switch (path) {
      case 'new-event':
        if (this.currentView) { this.currentView.resetData(); }
        document.querySelector('html').style.overflow = 'hidden';
        this.currentView = new CreateEvent();
        break;
      case 'view-events':
        if (this.currentView) { this.currentView.resetData(); }
        this.currentView = new ViewEvent();
        break;
      case 'home':
        if (this.currentView) {
          this.currentView.resetData();
          delete this.currentView;
        }
        if (!this.pages.home) { // if this is the first visit
          document.querySelector('#home-new').addEventListener(uiQuery.clickAction, function() {
            self.setHash('new-event');
          });
          document.querySelector('#home-view').addEventListener(uiQuery.clickAction, function() {
            self.setHash('view-events');
          });
          this.pages.home = true;
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

  this.setHash = function(path) {
    window.location.hash = '#' + path;
  };

  self.getHash();

  window.addEventListener('hashchange', function() {
    self.getHash();
  }, false);

};

module.exports = Router;

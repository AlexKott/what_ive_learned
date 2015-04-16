var CreateEvent = require('./create-event.js');

var Router = function() {
  var self = this,
      hash;

  this.pages = {
    'new-event':true,
    'show-events':true
  };

  this.loadView = function(path) {
    var pages = document.querySelectorAll('.page'),
        pagesLength = pages.length;

    // TODO check if an instance of CreateEvent exists and
    //      confirm changing page!

    switch (path) {
      case 'new-event':
        new CreateEvent();
        break;
      case 'show-events':
        break;
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

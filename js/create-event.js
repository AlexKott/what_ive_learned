var LearnEvent = require('./learn-event.js'),
    category = require('./category.js'),
    subject = require('./subject');

var CreateEvent = function() {

  this.data =  {};

  this.setToday = function() {
    this.data.today = LearnEvent.prototype.transformDate(new Date());

    document.querySelector('#new-date').innerText = this.data.today;
  };

  this.setupListener = function() {
    var self = this;

    document.querySelector('#new-cat-list')
      .addEventListener('click', function(e) {
        self.updateSubs(e.target);
      }, false);

    document.querySelector('#new-sub-list')
      .addEventListener('click', function(e) {
        self.selectedSub(e.target);
      }, false);

    document.querySelector('#new-description')
      .addEventListener('input', function(e) {
        self.changedDescr(e.target);
      }, false);

    document.querySelector('#new-submit')
      .addEventListener('click', function() {
        self.submitEvent();
      }, false);

  };

  this.removeListener = function() {
    var eList = ['new-cat-list', 'new-sub-list', 'new-description', 'new-submit'],
        oldE, newE;

    eList.forEach(function(v) {
      oldE = document.getElementById(v);
      newE = oldE.cloneNode(true);
      oldE.parentNode.replaceChild(newE, oldE);
    });

  };

  this.loadCats = function() {
    var catList = category.getCatList(),
        catDOMList = document.querySelector('#new-cat-list'),
        newCat;

    this.fillDOMList(catList, catDOMList);
  };

  this.updateSubs =  function(target) {
    if(target.tagName === 'LI' && target.className.indexOf('active') === -1) {

      var subList = subject.getSubList(target.innerText),
          subDOMList = document.querySelector('#new-sub-list'),
          newSub;

      this.resetActive('new-event');
      target.className += ' active';
      this.data.category = target.innerText;

      this.fillDOMList(subList, subDOMList);
    }
  };

  this.selectedSub = function(target) {
    if(target.tagName === 'LI' && target.className.indexOf('active') === -1) {

      this.resetActive('new-sub-list');
      target.className += ' active';
      this.data.subject = target.innerText;

      document.querySelector('#new-description').style.display = 'block';
      document.querySelector('#new-submit').style.display = 'block';
    }
  };


  this.resetActive = function(el) {
    var queryList = document.querySelector('#' + el),
        aList = queryList.querySelectorAll('.active');
        aListLength = aList.length;

    for (var i = 0; i < aListLength; i++) {
      aList[i].className = aList[i].className.replace(' active', '');
    }

  };

  this.fillDOMList = function(list, DOMList) {
    var newItem;

    DOMList.innerHTML = '';

    list.forEach(function(item) {
      newItem = document.createElement('LI');
      newItem.innerText = item;
      DOMList.appendChild(newItem);
    });
  };

  this.changedDescr = function(target) {
    if(target.value !== null && target.value.trim() !== '') {
      document.querySelector('#new-submit').disabled = false;
      this.data.description = target.value;
    }
    else {
      document.querySelector('#new-submit').disabled = true;
    }
  };


  this.submitEvent = function() {
    var date = this.data.today,
        fields = {
          category: this.data.category,
          subject: this.data.subject,
          description: this.data.description,
          isMilestone: document.querySelector('#new-milestone').checked
        };

    try {
      new LearnEvent(date, fields);
      alert('success!');
    }
    catch(error) {
      alert(error);
    }
  };

  this.setToday();
  this.setupListener();
  this.loadCats();
};

CreateEvent.prototype.resetData = function() {
  this.data = {};
  this.resetActive('new-event');
  this.removeListener();

  document.querySelector('#new-description>input[type="text"]').value = '';
  document.querySelector('#new-milestone').checked = false;
  document.querySelector('#new-description').style.display = 'none';
  document.querySelector('#new-submit').style.display = 'none';
  document.querySelector('#new-sub-list').innerHTML = '';

};


module.exports = CreateEvent;

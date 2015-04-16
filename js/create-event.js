var LearnEvent = require('./learn-event.js'),
    category = require('./category.js'),
    subject = require('./subject');

var CreateEvent = function() {

  this.data =  {
    today: 0,
    type: 'primary'
  };

  this.setToday = function() {
    this.data.today = LearnEvent.prototype.transformDate(new Date());
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

      this.fillDOMList(subList, subDOMList);
    }
  };

  this.selectedSub = function(target) {
    if(target.tagName === 'LI' && target.className.indexOf('active') === -1) {

      this.resetActive('new-sub-list');
      target.className += ' active';

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
    }
    else {
      document.querySelector('#new-submit').disabled = true;
    }
  };


    submitEvent = function() {
        var date, type, fields = {};

        date = this.newEvent.date;
        type = this.newEvent.type;

        fields.category = document.querySelector('#new-cat-list>li.active').innerText;
        fields.subject = document.querySelector('#new-sub-list>li.active').innerText;
        fields.description = document.querySelector('#new-description>input[type="text"]').value;


        try {
            new LearnEvent(date, type, fields);
            return true;
        }
        catch(error) {
            alert(error);
            return false;
        }
    };

    this.setToday();
    this.setupListener();
    this.loadCats();
};


module.exports = CreateEvent;

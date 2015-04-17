var uiQuery = require('./ui-query.js'),
    LearnEvent = require('./learn-event.js'),
    category = require('./category.js'),
    subject = require('./subject.js');

var CreateEvent = function() {

  this.data =  {};
  this.clickListeners = [];

  this.setToday = function() {
    this.data.today = LearnEvent.prototype.transformDate(new Date());

    document.querySelector('#new-date').innerText = this.data.today;
  };

  this.setupListeners = function() {
    var self = this,
        evList = this.clickListeners;

    document.querySelector('#add-cat')
      .addEventListener('click', function() {
        self.addCategory();
      }, false);
    evList.push('add-cat');

    document.querySelector('#add-sub')
      .addEventListener('click', function() {
        self.addSubject();
      }, false);
    evList.push('add-sub');

    document.querySelector('#new-cat-list')
      .addEventListener('click', function(e) {
        self.updateSubs(e.target);
      }, false);
    evList.push('new-cat-list');

    document.querySelector('#new-sub-list')
      .addEventListener('click', function(e) {
        self.selectedSub(e.target);
      }, false);
    evList.push('new-sub-list');

    document.querySelector('#new-description')
      .addEventListener('input', function(e) {
        self.changedDescr(e.target);
      }, false);
    evList.push('new-description');

    document.querySelector('#new-submit')
      .addEventListener('click', function() {
        self.submitEvent();
      }, false);
    evList.push('new-submit');

  };

  this.removeListeners = function() {
    var evList = this.clickListeners,
        oldE, newE;

    evList.forEach(function(v) {
      oldE = document.getElementById(v);
      newE = oldE.cloneNode(true);
      oldE.parentNode.replaceChild(newE, oldE);
    });

    this.clickListeners = [];
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

  this.loadCats = function() {
    var catList = category.getCatList(),
        catDOMList = document.querySelector('#new-cat-list'),
        newCat;

    this.fillDOMList(catList, catDOMList);
  };

  this.addCategory = function() {
    var self = this;
    uiQuery.showElem('#new-cat');
    document.querySelector('#new-cat-submit')
      .addEventListener('click', function() {
        var name = document.querySelector('#new-cat-name').value,
            color = document.querySelector('#new-cat-color').value;

        category.addNewCategory(name, {'color':color});
        self.loadCats();

        self.updateSubs(document.querySelector('#new-cat-list').lastChild);

        uiQuery.hideElem('#new-cat');

      }, false);

    this.clickListeners.push('new-cat-submit');

  };

  this.addSubject = function() {
    var self = this;
    uiQuery.showElem('#new-sub');
    document.querySelector('#new-sub-submit')
      .addEventListener('click', function() {
        var name = document.querySelector('#new-sub-name').value,
            color = document.querySelector('#new-sub-color').value;

        subject.addNewSubject(self.data.category, name, {'color':color});
        self.updateSubs(null, self.data.category);

        uiQuery.hideElem('#new-sub');

      }, false);

    this.clickListeners.push('new-sub-submit');
  };

  this.updateSubs =  function(target, directCat) {
    var subList, newSub,
        subDOMList = document.querySelector('#new-sub-list');

    if (target && target.tagName === 'LI' && target.className.indexOf('active') === -1) {

      subList = subject.getSubList(target.innerText);

      this.resetActive('new-event');
      target.className += ' active';
      this.data.category = target.innerText;

      uiQuery.showElem('#add-sub');
    }

    else if (directCat) {
      subList = subject.getSubList(directCat);
    }
      this.fillDOMList(subList, subDOMList);

    if (directCat) {
      subDOMList.lastChild.className += ' active';
    }

  };

  this.selectedSub = function(target) {
    if(target.tagName === 'LI' && target.className.indexOf('active') === -1) {

      this.resetActive('new-sub-list');
      target.className += ' active';
      this.data.subject = target.innerText;

      uiQuery.showElem(['#new-description', '#new-submit']);
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
  this.setupListeners();
  this.loadCats();
};

CreateEvent.prototype.resetData = function() {
  var inputTextList = document.querySelectorAll('#new-event input[type="text"]'),
      iTLength = inputTextList.length;

  this.data = {};
  this.resetActive('new-event');
  this.removeListeners();

  for (var i = 0; i < iTLength; i++) {
    inputTextList[i].value = '';
  }
  // Needs to get cleared again through a bug ?!
  document.querySelector('#new-description>input').value = '';

  uiQuery.hideElem(['#new-description', '#new-submit', '#new-cat', '#add-sub', '#new-sub']);
  document.querySelector('#new-milestone').checked = false;
  document.querySelector('#new-sub-list').innerHTML = '';

};


module.exports = CreateEvent;

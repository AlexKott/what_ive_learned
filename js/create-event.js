var uiQuery = require('./ui-query.js'),
    ColorPicker = require('./color-picker.js'),
    LearnEvent = require('./learn-event.js'),
    category = require('./category.js'),
    subject = require('./subject.js');

var CreateEvent = function() {

  /*
    Since I will be using the ColorPicker two times,
    it needs to get configured.
  */
  ColorPicker.prototype.configColors(false, ['rgb(120,130,140)', '#99eeff', 'rgb(180,200,50)', 'rgb(10,210,180)']);
  ColorPicker.prototype.configSize(2, 30);

  this.data =  {};
  this.clickListeners = [];

  this.setToday = function() {
    var date = new Date(),
        weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayName = weekDays[date.getDay()],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthName = months[date.getMonth()];
    this.data.today = LearnEvent.prototype.transformDate(date);

    document.querySelector('#new-date').innerText = dayName + ', ' + date.getDate() + '. ' + monthName + ' ' + date.getFullYear();
  };

  this.setupListeners = function() {
    var self = this,
        evList = this.clickListeners;

    document.querySelector('#add-cat')
      .addEventListener(uiQuery.clickAction, this.addCategory.bind(this));
    evList.push('add-cat');

    document.querySelector('#add-sub')
      .addEventListener(uiQuery.clickAction, this.addSubject.bind(this));
    evList.push('add-sub');

    document.querySelector('#new-cat-list')
      .addEventListener(uiQuery.clickAction, function(e) {
        self.updateSubs(e.target);
      }, false);
    evList.push('new-cat-list');

    document.querySelector('#new-sub-list')
      .addEventListener(uiQuery.clickAction, function(e) {
        self.selectedSub(e.target);
      }, false);
    evList.push('new-sub-list');

    document.querySelector('#new-description')
      .addEventListener('input', function(e) {
        self.changedDescr(e.target);
      }, false);
    evList.push('new-description');

    document.querySelector('#new-submit')
      .addEventListener(uiQuery.clickAction, this.submitEvent.bind(this));
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
    var self = this,
        catList = LearnEvent.prototype.getCategories(),
        colorBlackList = [],
        createListener = true,
        hideNewCat = function(e) {
          if (e.target.id !== 'new-cat' &&
              e.target.parentNode.id !== 'new-cat' &&
              e.target.id !== 'add-cat' &&
              e.target.className.indexOf('colorpicker-field') === -1) {
            uiQuery.hideElem('#new-cat');
            if (this.catColorPicker) {
              this.catColorPicker.hideColorPicker();
            }
            document.removeEventListener(uiQuery.clickAction, hideNewCat);
          }
        };

    uiQuery.showElem('#new-cat');

    document.addEventListener(uiQuery.clickAction, hideNewCat);

    if (!this.catColorPicker) {
      this.catColorPicker = new ColorPicker(document.querySelector('#new-cat-color'));
    }

    for (var cat in catList) {
      colorBlackList.push(catList[cat].color);
    }
    this.catColorPicker.removeColors(colorBlackList);
    this.catColorPicker.createElement();

    this.clickListeners.forEach(function(listener) {
      if(listener === 'new-cat-submit') { createListener = false; }
    });

    if(createListener) {
      document.querySelector('#new-cat-submit')
        .addEventListener(uiQuery.clickAction, function() {
          var name = document.querySelector('#new-cat-name').value,
              color = ColorPicker.prototype.getColorString(self.catColorPicker.currentColor);
          category.addNewCategory(name, {'color':color});
          self.catColorPicker.removeColors([color]);
          self.catColorPicker.createElement();
          self.catColorPicker.resetColor();

          self.loadCats();

          self.updateSubs(document.querySelector('#new-cat-list').lastChild);

          document.querySelector('#new-cat-name').value = '';

          uiQuery.hideElem('#new-cat');

          document.removeEventListener(hideNewCat);

        }, false);

      this.clickListeners.push('new-cat-submit');
    }

  };

  this.addSubject = function() {
    var self = this,
        catList = LearnEvent.prototype.getCategories(),
        colorBlackList = [],
        createListener = true;
        hideNewSub = function(e) {
          if (e.target.id !== 'new-sub' &&
              e.target.parentNode.id !== 'new-sub' &&
              e.target.id !== 'add-sub' &&
              e.target.className.indexOf('colorpicker-field') === -1) {
            uiQuery.hideElem('#new-sub');
            if (this.subColorPicker) {
              this.subColorPicker.hideColorPicker();
            }
            document.removeEventListener(uiQuery.clickAction, hideNewSub);
          }
        };

    uiQuery.showElem('#new-sub');

    document.addEventListener(uiQuery.clickAction, hideNewSub);

    if (!this.subColorPicker) {
      this.subColorPicker = new ColorPicker(document.querySelector('#new-sub-color'));
    }

    for (var sub in catList[self.data.category].subjects) {
      colorBlackList.push(catList[self.data.category].subjects[sub].color);
    }
    this.subColorPicker.removeColors(colorBlackList);
    this.subColorPicker.createElement();

    this.clickListeners.forEach(function(listener) {
      if(listener === 'new-sub-submit') { createListener = false; }
    });

    if (createListener) {
      document.querySelector('#new-sub-submit')
        .addEventListener(uiQuery.clickAction, function() {
          var name = document.querySelector('#new-sub-name').value,
              color = ColorPicker.prototype.getColorString(self.subColorPicker.currentColor);

          subject.addNewSubject(self.data.category, name, {'color':color});
          self.subColorPicker.removeColors([color]);
          self.subColorPicker.createElement();
          self.subColorPicker.resetColor();
          self.updateSubs(null, self.data.category);
          self.data.subject = name;

          uiQuery.showElem(['#new-description', '#new-submit']);

          document.querySelector('#new-sub-name').value = '';

          uiQuery.hideElem('#new-sub');

        }, false);

      this.clickListeners.push('new-sub-submit');
    }
  };

  this.updateSubs =  function(target, directCat) {
    var subList, newSub,
        subDOMList = document.querySelector('#new-sub-list'),
        isValidTarget = (target && target.tagName === 'LI' && target.className.indexOf('active') === -1);

    if (isValidTarget) {

      subList = subject.getSubList(target.innerText);

      this.resetActive('new-event');
      target.className += ' active';
      this.data.category = target.innerText;

      uiQuery.showElem('#add-sub');
    }

    else if (directCat) { subList = subject.getSubList(directCat); }

    if (isValidTarget || directCat) { this.fillDOMList(subList, subDOMList); }

    if (directCat) { subDOMList.lastChild.className += ' active'; }

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

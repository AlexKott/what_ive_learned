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

  this.states = ['settingCat', 'settingSub', 'settingText', 'done', 'addingCat', 'addingSub'];
  this.currentState = 0;
  this.data =  {'milestone': false};
  this.clickListeners = [];

  this.setToday = function() {
    var date = new Date(),
        weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayName = weekDays[date.getDay()],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthName = months[date.getMonth()];
    this.data.today = LearnEvent.prototype.transformDate(date);

    document.querySelector('#current-date').innerText = dayName + ', ' + date.getDate() + '. ' + monthName + ' ' + date.getFullYear();
  };

  this.fillContainer = function() {
    if (this.currentState === 0 || this.currentState === 1) { // settingCat or settingSub
      this.fillNewList();
    }
    else if (this.currentState === 2) { // settingText
      this.fillNewDescription();
    }
    else if (this.currentState === 3) { // done

    }
    else if (this.currentState === 4 || this.currentState === 5) { // addingCat or addingSub
      this.fillAddForm();
    }

    this.setupListener();
  };

  this.fillNewList = function() {
    var newList = document.querySelector('#new-list'),
        loadedList, newListItem;

    newList.innerHTML = '';

    if (this.currentState === 0) { // settingCat
      loadedList = category.getCatList();
    }
    else if (this.currentState === 1) { // settingSub
      loadedList = subject.getSubList(this.data.category);
    }

    loadedList.forEach(function (item) {
      newListItem = document.createElement('LI');
      newListItem.innerText = item;
      newList.appendChild(newListItem);
    });

    uiQuery.showElem('#new-select');
  };

  this.fillNewDescription = function() {
    uiQuery.hideElem('#new-select');
    uiQuery.showElem('#new-description');
  };

  this.fillAddForm = function() {
    if (!this.cPicker) {
      this.cPicker = new ColorPicker(document.querySelector('#add-color'));
    }

    uiQuery.hideElem('#new-select');
    uiQuery.showElem('#add-form');
  };

  this.setupListener = function() {
    var action = uiQuery.clickAction,
        selector, func, newState, addFunc, addFunc2;
    this.removeListeners();

    // one listener for each state through switch.
    // additional listeners need to be added below this.
    switch (this.currentState) {
      case 0: // settingCat
      case 1: // settingSub
        selector = '#new-list';
        func = this.selectedCatOrSub.bind(this);
        break;
      case 2: // settingText
        action = 'input';
        selector = '#new-description';
        func = this.checkDescription.bind(this);
        break;
      case 3: // done
        break;
      case 4: // addingCat
      case 5: // addingSub
        selector = '#add-submit';
        func = this.addCatOrSub.bind(this);
        break;
    }

    document.querySelector(selector).addEventListener(action, func);
    this.clickListeners.push(selector);


    // additional listener needed for "Add Cat / Add Sub" - button
    if (this.currentState === 0 || this.currentState === 1) { // settingCat or settingSub
      addFunc = function() {
        if (this.currentState === 0) { // settingCat
          this.currentState = 4; // addingCat
        }
        else if (this.currentState === 1) { // settingSub
          this.currentState = 5; // addingSub
        }
        this.fillContainer.call(this);

      }.bind(this);

      document.querySelector('#new-add').addEventListener(uiQuery.clickAction, addFunc);
      this.clickListeners.push('#new-add');
    }

    // additional listeners needed for submit new event button and milestone
    if (this.currentState === 2) { // settingText
      console.log('asdfgg');
      addFunc = function(e) {
        if (!e.target.disabled) {
          this.submitEvent.call(this);
          this.currentState = 3; // done
          this.fillContainer.call(this);
        }
      }.bind(this);
      addFunc2 = function(e) {
        this.data.milestone = !this.data.milestone;

        console.log('asdf');

        if (this.data.milestone) {
          e.target.className += ' active';
        }
        else {
          e.target.className = e.target.className.replace(' active', '');
        }
      }.bind(this);
      document.querySelector('#new-submit').addEventListener(uiQuery.clickAction, addFunc);
      this.clickListeners.push('#new-submit');

      document.querySelector('#new-milestone').addEventListener(uiQuery.clickAction, addFunc2);
      this.clickListeners.push('#new-milestone');

    }

  };

  this.removeListeners = function() {
    var oldE, newE;
    this.clickListeners.forEach(function(v) {
      oldE = document.querySelector(v);
      newE = oldE.cloneNode(true);
      oldE.parentNode.replaceChild(newE, oldE);
    });

    this.clickListeners = [];
  };

  this.selectedCatOrSub = function(e, directSel) {
    var isValidTarget = (e && e.target && e.target.tagName === 'LI'),
        selText, selWhat;

    if (isValidTarget || directSel) {

      if (!directSel) { directSel = e.target.innerText; }

      if (this.currentState === 1) { // settingSub
        selWhat = 'subject';
        this.currentState = 2; // settingText
      }

      else if (this.currentState === 0) { // settingCat
        selWhat = 'category';
        this.currentState = 1; // settingSub
      }

      this.data[selWhat] = directSel;
      document.querySelector('#current-' + selWhat).innerText = directSel;
      uiQuery.showElem('#current-' + selWhat);

      this.fillContainer();
    }
  };

  this.addCatOrSub = function() {
    var addTitle = document.querySelector('#add-title').value,
        isValid = this.checkAddValue(addTitle),
        color = this.cPicker.currentColor;

    if (!isValid) {
      throw new Error('No valid title'); // TODO change this
    }

    if (this.currentState === 4) { // addingCat
      category.addNewCategory(addTitle, {'color': color});
      this.currentState = 0; // settingCat
    }
    else if (this.currentState === 5) { // addingSub
      subject.addNewSubject(this.data.category, addTitle, {'color': color});
      this.currentState = 1; // settingSub
    }

    uiQuery.hideElem('#add-form');

    this.selectedCatOrSub(null, addTitle);
  };

  this.checkAddValue = function(addValue) {
    var checkList;

    if (addValue.trim() === '') { return false; }

    if (this.currentState === 4) { // addingCat
      checkList = category.getCatList();
    }
    else if (this.currentState === 5) { // addingSub
      checkList = subject.getSubList(this.data.category);
    }

    checkList.forEach(function(val) {
      if (addValue === val) { return false; }
    });

    return true;
  };

  this.checkDescription = function(e) {
    if(e.target.value !== null && e.target.value.trim() !== '') {
      document.querySelector('#new-submit').disabled = false;
      this.data.description = e.target.value;
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
  this.currentState = 0; // settingCat
  this.fillContainer();

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

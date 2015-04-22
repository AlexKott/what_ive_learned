var uiQuery = require('./ui-query.js'),
    LearnEvent = require('./learn-event.js');

/*
  The constructor for a new ColorPicker. By default
  the "el" should be a div, so that the css styles
  can get applied.
*/
var ColorPicker = function (el, list, currentCat) {
  var self = this,
      currentColor = {};

  /*
    This copies the buttonElement once for each color
  */
  this.createElements = function() {
    var pickerField, listEl = this.listEl;

    listEl.innerHTML = '';

    this.colorList.forEach(function(color) {
      pickerField = document.createElement('DIV');
      pickerField.classList.add('colorpicker-field');
      pickerField.style.backgroundColor = color;
      listEl.appendChild(pickerField);
    });

    this.listEl.addEventListener(uiQuery.clickAction, this.setColor);
  };

  this.setColor = function(e) {
    if (e.target.className.indexOf('colorpicker-field') !== -1 ) {
      // Extract the the values from backgroundColor
      var bgColor = e.target.style.backgroundColor,
          colors = bgColor.toColor();
          nowActive = document.querySelector('.active-color');
      if (nowActive) {
        nowActive.className = nowActive.className.replace(' active-color', '');
      }
      e.target.className += ' active-color';

      this.currentColor = colors;
    }
  }.bind(this);

  this.resetColor = function() {
    var nowActive = document.querySelector('.active-color');
    if (nowActive) {
      nowActive.className = nowActive.className.replace(' active-color', '');
    }
    this.currentColor = '';
  };

  this.getColorBlackList = function(listName) {
    var categories = LearnEvent.prototype.getCategories(),
        blackList = [];

    if (listName === 'colorListCat') {
      for (var cat in categories) {
        blackList.push(this.getColorString(categories[cat].color));
      }
    }
    else if (listName === 'colorListSub') {
      blackList.push(this.getColorString(categories[currentCat].color));
      for (var sub in categories[currentCat].subjects) {
        blackList.push(this.getColorString(categories[currentCat].subjects[sub].color));
      }
    }
    this.removeColors.call(this, blackList);
  };

  this.removeColors = function (blackList) {
    var self = this;

    blackList.forEach(function (bColor) {
      for (var i = 0; i < self.colorList.length; i++) {
        if (self.colorList[i] === bColor) {
          self.colorList.splice(i, 1);
          break;
        }
      }
    });
  };

  this.colorList = this[list];
  this.getColorBlackList.call(this, list);
  this.listEl = el;
  this.createElements.call(this);
};

/*
  All colors from configColors are stored here.
  Colors must be in a css-readable format
  (e.g. '#fed123' or 'rgb(120, 140, 200)')
*/
ColorPicker.prototype.colorListCat = [];
ColorPicker.prototype.colorListSub = [];
/*
  Use this functions to configure your colorList.
  If clearColors is set, all color presets are removed.
*/
ColorPicker.prototype.configColors = function(list, clearColors, colors) {
  var self = this;
  if (clearColors) { self[list] = []; }
  if (colors) {
    colors.forEach(function(color) {
      if(color.substring(0,4) !== 'rgb(') {
        color = ColorPicker.prototype.hexToRgb(color);
        color = ColorPicker.prototype.getColorString(color);
      }
      if (color) {
        self[list].push(color);
      }
    });
  }
};
/*
  Define the columns of colorFields and their size.
*/
ColorPicker.prototype.configSize = function(columns, fieldSize) {
  var self = this;

  if (columns) { self.columns = columns; }

  if (fieldSize) { self.fieldSize = fieldSize; }
};

ColorPicker.prototype.getColorString = function(colors) {
  return 'rgb(' + colors.r + ',' + colors.g + ',' + colors.b + ')';
};

ColorPicker.prototype.hexToRgb = function(hexColor) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hexColor = hexColor.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

/*
  Adding a prototype function to String, that converts
  strings in format rgb(x,y,z) to a color map of type
  {r:x, g:y, b:z}
*/
String.prototype.toColor = function() {
  var colorString = this.substring(4, this.length-1),
      colorList = colorString.split(',');
  return {r:colorList[0].trim(), g:colorList[1].trim(), b:colorList[2].trim()};
};

module.exports = ColorPicker;

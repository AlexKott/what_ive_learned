var uiQuery = require('./ui-query.js');

/*
  The constructor for a new ColorPicker. By default
  the "el" should be a div, so that the css styles
  can get applied.
*/
var ColorPicker = function (el) {
  var self = this;

  var currentColor = {};

  /*
    The picker position is set to the bottom left corner
    of the given element. This only needs to get calculated once.
  */
  this.setPickerPosition = function() {
    var elPos = el.getBoundingClientRect(),
        x, y;

    x = elPos.left + el.offsetWidth;
    y = elPos.top + el.offsetHeight;

    return {'x': x, 'y': y};
  };

  /*
    After configuring the colors you can create the picker.
    The picker element is cached and gets appended / removed
    on demand.
  */
  this.createElement = function() {
    var pickerEl = document.createElement('DIV'),
        fieldSize, columns, maxWidth, pickerField;

    if (this.fieldSize) { fieldSize = this.fieldSize; }
    else { fieldSize = 40; }

    if (this.columns) { columns = this.columns; }
    else { columns = 5; }

    maxWidth = fieldSize * columns;

    pickerEl.classList.add('colorpicker-element');
    pickerEl.style.left = this.pickerPosition.x + 'px';
    pickerEl.style.top = this.pickerPosition.y + 'px';
    pickerEl.style.maxWidth = maxWidth + 'px';

    this.colorList.forEach(function(color) {
      pickerField = document.createElement('DIV');
      pickerField.classList.add('colorpicker-field');
      pickerField.style.backgroundColor = color;
      pickerField.style.width = fieldSize + 'px';
      pickerField.style.height = fieldSize + 'px';
      pickerEl.appendChild(pickerField);
    });

    this.pickerEl = pickerEl;

  };

  this.setColor = function(e) {
    if (e.target.className.indexOf('colorpicker-field') !== -1 ) {
      // Extract the the values from backgroundColor
      var bgColor = e.target.style.backgroundColor,
          colors = bgColor.toColor();

      this.currentColor = colors;
      this.buttonEl.style.backgroundColor = this.getColorString(colors);
      this.hideColorPicker();
    }
  };

  /*
    Appends the colorPicker to the document body.
  */
  this.showColorPicker = function() {
    if (!this.isPickerShown) {
      document.querySelector('body').appendChild(this.pickerEl);
      this.isPickerShown = true;
    }
  };

  /*
    Removes the colorPicker from the document body.
  */
  this.hideColorPicker = function() {
    if (this.isPickerShown) {
      document.querySelector('body').removeChild(this.pickerEl);
      this.isPickerShown = false;
    }
  };

  this.buttonEl = el;
  this.pickerPosition = this.setPickerPosition();
  this.createElement();
  el.addEventListener(uiQuery.clickAction, this.showColorPicker.bind(this));
  this.pickerEl.addEventListener(uiQuery.clickAction, this.setColor.bind(this));
};

/*
  All colors from configColors are stored here.
  Colors must be in a css-readable format
  (e.g. '#fed123' or 'rgb(120, 140, 200)')
*/
ColorPicker.prototype.colorList = ['#ff00ff', '#aa88ff'];
/*
  Use this functions to configure your colorList.
  If clearColors is set, all color presets are removed.
*/
ColorPicker.prototype.configColors = function(clearColors, colors) {
  var self = this;
  if (clearColors) { self.colorList = []; }
  if (colors) {
    colors.forEach(function(color) {
      self.colorList.push(color);
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

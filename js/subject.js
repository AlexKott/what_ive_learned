var dataControl = require('./data-control.js');

var subject = {
  addNewSubject: function(category, subject, fields) {

    var categories = dataControl.categories;

    if(categories[category] === undefined) {
      throw new Error('Category does not exist!');
    }
    else if (categories[category].subjects[subject] !== undefined) {
      throw new Error('Subject already exists');
    }
    else {
      categories[category].subjects[subject] = fields;
      dataControl.saveToJson('categories');
    }
  },

  getSubList: function(category) {
    var subs = [];

    for (var sub in dataControl.categories[category].subjects) {
      subs.push(sub);
    }

    return subs;
  }
};

module.exports = subject;

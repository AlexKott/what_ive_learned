var dataControl = require('./data-control.js');

var category = {

  addNewCategory: function(title, fields) {

    var categories = dataControl.categories;

    if(categories[title] !== undefined) {
      throw new Error('Category already exists');
    }

    categories[title] = fields;
    categories[title].subjects = {};

  dataControl.saveToJson('categories');
  },

  getCatList: function() {
    var cats = [];

    for (var cat in dataControl.categories) {
      cats.push(cat);
    }

    return cats;
  }

};

module.exports = category;

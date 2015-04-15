var categories = require('./content/categories.js');

var category = {

    addNewCategory: function(title, fields) {

        if(categories[title] !== undefined) {
            throw new Error('Category already exists');
        }

        categories[title] = fields;
        categories[title].subjects = {};
    },

    getCatList: function() {
        var cats = [];

        for (var cat in categories) {
            cats.push(cat);
        }

        return cats;
    }

};

module.exports = category;

var categories = require('./content/categories.js');

var Category = {

    addNewCategory: function(title, fields) {

        if(categories[title] !== undefined) {
            throw new Error('Category already exists');
        }

        categories[title] = fields;
        categories[title].subjects = {};
    }

};

module.exports = Category;

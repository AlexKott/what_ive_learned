var categories = require('./content/categories.js');

var subject = {
    addNewSubject: function(category, subject, fields) {
        if(categories[category] === undefined) {
            throw new Error('Category does not exist!');
        }
        else if (categories[category].subjects[subject] !== undefined) {
            throw new Error('Subject already exists');
        }
        else {
            categories[category].subjects[subject] = fields;
        }
    },

    getSubList: function(category) {
        var subs = [];

        for (var sub in categories[category].subjects) {
            subs.push(sub);
        }

        return subs;
    }
};

module.exports = subject;

var assert = require('assert'),
    LearnEvent = require('../js/learn_event'),
    Category = require('../js/category'),
    Subject = require('../js/subject'),
    Router = require('../js/router'),
    categories = require('../js/content/categories'),
    events = require('../js/content/events');

describe('Category', function() {
    it('should have a method to add a new category to the list', function() {
        Category.addNewCategory('Reading', {'color':'abcdef'});

        assert.equal(categories.Reading.color, 'abcdef');
    });
});

describe('Subject', function() {
    it('should have a method to add new subjects', function() {
        var category = 'Cookings',
            subject = 'Vegetarian Recipes';

        Category.addNewCategory(category, {'color':'abcdef'});

        Subject.addNewSubject(category, subject, {'color':'fff000'});

        assert.equal(categories.Cookings.subjects['Vegetarian Recipes'].color, 'fff000');

    });
});

describe('Learn Event', function() {

    before(function(done) {
        LearnEvent.prototype.clear = function() {
            for (var prop in events) {
                delete events[prop];
            }
        };
        done();
    });

    afterEach(function(done) {
        LearnEvent.prototype.clear();
        done();
    });

    it('should set the event date the actual date', function() {
        var newEvent = new LearnEvent(null, 'primary', {category:'Cooking', subject:'Vegan Recipes', description:'c'}),
            newDate = new Date(),
            year = newDate.getFullYear(),
            month = ('0' + (newDate.getMonth() + 1)).slice(-2),
            day = ('0' + newDate.getDate()).slice(-2);
            currentDate = year.toString() + month + day;

        assert.equal(newEvent.date, currentDate);
    });

    it ('should take a date parameter to set the date manually', function() {
        var newEvent = new LearnEvent(2014510, 'primary', {category:'Cooking', subject:'Vegan Recipes', description:'c'});

        assert.equal(newEvent.date, 2014510);
    });

    it('should take a date as identifier and add itself to saved events', function() {
        var cDate = 20140510,
            category = 'Cooking',
            subject = 'Vegan Recipes',
            fields = {'isMilestone':false, 'category':category, 'subject':subject, 'description':'I finally learned cooking vegan'},
            newEvent = new LearnEvent(cDate, 'primary', fields);

        assert.equal(events[cDate].primary.category, category);
    });

    it('should provide a deleting method for registered events', function() {

        new LearnEvent(20150414, 'primary', {category:'Cooking', subject:'Vegan Recipes', description:'c'});
        new LearnEvent(20150415, 'primary', {category:'Cooking', subject:'Vegan Recipes', description:'c'});

        LearnEvent.prototype.delete(20150414);

        testDelete = function() {
            LearnEvent.prototype.delete(20150412);
        };

        assert.equal(events[20150414], undefined);
        assert.equal(events[20150415].primary.category, 'Cooking');

        assert.throws(testDelete, Error, 'NOT POSSIBLE TO DELETE EVENT');
    });

    it('should provide a static method for field checking', function() {

        var newFields = {
            type: 'primary',
            isMilestone: true,
            category: 'Cooking',
            subject: 'Vegan Recipes',
            description: 'Cooking chicken meatballs, filled with chicken'
        };

        var fields = LearnEvent.prototype.checkFields(newFields);

        new LearnEvent(123, 'primary', fields);

        assert.equal(events[123].primary.category, 'Cooking');
        assert.equal(events[123].primary.isMilestone, true);

    });

    it('should test the field data for invalid values and throw an error', function() {
        var invalidFields2 = {
            isMilestone: true,
            category: 'Coking',
            subject: 'Vegan Recipes',
            description: 'Cooking melted grass'
        };
        var invalidFields3 = {
            isMilestone: true,
            category: 'Cooking',
            subject: 'Vegetarian Recipes',
            description: 'Cooking melted grass'
        };
        var invalidFields4 = {
            isMilestone: true,
            category: 'Cooking',
            subject: 'Vegan Recipes'
        };

        function cFields2() {
            LearnEvent.prototype.checkFields(invalidFields2);
        }
        function cFields3() {
            LearnEvent.prototype.checkFields(invalidFields3);
        }
        function cFields4() {
            LearnEvent.prototype.checkFields(invalidFields4);
        }


        assert.throws(cFields2, Error, 'category does not exist');
        assert.throws(cFields3, Error, 'subject does not exist');
        assert.throws(cFields4, Error, 'description missing');
    });

    it('should throw an error if a secondary event is about to be milestone', function() {
        function invalidEvent() {
            var newEvent = new LearnEvent(null, 'secondary', {'isMilestone':true, 'category':'Cooking', 'subject':'Vegan Recipes', 'description':'asdf'});
        }

        assert.throws(invalidEvent, Error, 'secondary cannot be milestone');

    });
});

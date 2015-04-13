var assert = require('assert'),
    LearnEvent = require('../js/learn_event'),
    Category = require('../js/category'),
    Subject = require('../js/subject'),
    subjects = require('../js/content/subjects'),
    events = require('../js/content/events');

describe('Category', function() {
    describe('Add a new Category', function() {

        it('should be possible to add a new category to the list', function() {
            var newCat = new Category('Reading', {'color':'abcdef'});
            subjects[newCat.title] = newCat.fields;

            assert.equal(subjects.Reading.color, 'abcdef');
        });

    });
});

describe('Subject', function() {
    describe('Add a new Subject', function() {
        it('should be possible to add a new subject with some properties', function() {
            var category = 'Cooking',
                subject = 'Vegan Recipes',
                newCat = new Category(category, {'color':'abcdef'}),
                newSub = new Subject('Vegan Recipces', category, {'color':'fff000'});

            subjects[category] = newCat.fields;
            subjects[category][subject] = newSub.fields;

            assert.equal(subjects.Cooking['Vegan Recipes'].color, 'fff000');

        });
    });
});

describe('Learn Event', function() {
    describe('Add a new learn event', function() {

        it('should set the event date the actual date', function() {
            var newEvent = new LearnEvent(null),
                date = new Date(),
                currentDate = date.getFullYear() + '' + date.getMonth() + '' + date.getDate();

            assert.equal(newEvent.date, currentDate);
        });

        it ('should take a date parameter to set the date manually', function() {
            var newEvent = new LearnEvent(null),
                date = new Date(),
                currentDate = date.getFullYear() + '' + date.getMonth() + '' + date.getDate();

            assert.equal(newEvent.date, currentDate);
        });

        it('should take a date as identifier and add itself to saved events', function() {
            var date = new Date(),
                cDate = date.getFullYear().toString().concat(date.getMonth(), date.getDate()),
                category = 'Cooking',
                subject = 'Vegan Recipes',
                fields = {'type':'primary', 'isMilestone':false, 'category':category, 'subject':subject, 'description':'I finally learned cooking vegan'},
                newEvent = new LearnEvent(null, fields);

            assert.equal(events[cDate].type, 'primary');
            assert.equal(events[cDate].category, category);
        });

        it('should be possible to delete an event from the list', function() {

            new LearnEvent(2015314, {'type':'primary'});
            new LearnEvent(2015315, {'type':'primary'});

            LearnEvent.prototype.delete(2015314);

            testDelete = function() {
                LearnEvent.prototype.delete(2015312);
            };

            assert.equal(events[2015314], undefined);
            assert.equal(events[2015315].type, 'primary');

            assert.throws(testDelete, Error, 'NOT POSSIBLE TO DELETE EVENT');

        });

    });
});

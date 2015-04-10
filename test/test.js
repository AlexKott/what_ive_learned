var assert = require('assert'),
    L = require('../js/learn_event'),
    C = require('../js/category');

describe('Learn Event', function() {
    describe('Add a new learn event', function() {
        it('should have a method for creating a new event', function() {
            assert.equal(typeof L.constructor, 'function');
        });

        it('should take a primary or secondary type', function() {
            var newEventP = new L('primary'),
                newEventS = new L('secondary');

            assert.equal(newEventP.type, 'primary');
            assert.equal(newEventS.type, 'secondary');
        });

        it('should set the event date the actual date', function() {
            var newEvent = new L('primary'),
                date = new Date();
                currentDate = date.getFullYear() + '' + date.getMonth() + '' + date.getDate();

            assert.equal(newEvent.date, currentDate);
        });

        it ('take a date parameter to set the date manually', function() {
            var newEvent = new L('primary', '20150120');

            assert.equal(newEvent.date, '20150120');
        });

    });
});

describe('Category', function() {
    describe('Add a new Category', function() {
        it('should have a constructor for a new Category', function() {
            assert.equal(typeof C.constructor, 'function');
        });

        it('should take a parameter for a new title', function() {
            var newCat = new C('newTitle');

            assert.equal(newCat.title, 'newTitle');
        });

    });
});

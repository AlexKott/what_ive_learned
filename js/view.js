var createEvent = require('./create_event.js'),
    category = require('./category.js');

var view = {

    getMain: function() {
        return document.querySelector('#main');
    },

    loadHome: function() {

        var self = this,
            tpl = document.querySelector('#home-tpl'),
            homeTpl = tpl.content.cloneNode(tpl);

        homeTpl.querySelector('#home-new').
            addEventListener('click', function() {
                self.loadNewEventData.init();
                self.hide('home');
            }, false);

        homeTpl.querySelector('#home-show').
            addEventListener('click', function() {

            }, false);

        this.getMain().appendChild(homeTpl);

    },

    loadNewEventData: {
        init: function() {
            var tplNew = document.querySelector('#new-event-tpl'),
                nTpl = tplNew.content.cloneNode(tplNew),
                date = createEvent.getDate();

            nTpl.querySelector('#new-date').innerText = date;

            view.getMain().appendChild(nTpl);

            this.loadCats();
        },

        loadCats: function() {
            var catList = document.querySelector('#new-cat-list'),
                cats = category.getCatList(),
                catsLength = cats.length;

            for (var i = 0; i < catsLength; i++) {
                catList.innerHTML += '<li>' + cats[i] + '</li>';
            }
        }
    },



    hide: function(path) {
        var toHide = document.querySelector('#' + path);

        // TODO Fancy animations and stuff...

        toHide.parentNode.removeChild(toHide);
    }
};

module.exports = view;

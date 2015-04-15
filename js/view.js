var createEvent = require('./create_event.js'),
    category = require('./category.js'),
    subject = require('./subject.js'),
    events = require('./content/events.js');

/*
    TODO: Large parts of this need to get rewritten!
*/


var view = {

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
                self.showEvents();
                self.hide('home');
            }, false);

        document.querySelector('#main').innerHTML = '';
        document.querySelector('#main').appendChild(homeTpl);

    },

    showEvents: function() {
        var tplShowCont = document.querySelector('#show-events-tpl'),
            tplShow = document.querySelector('#show-single-event-tpl'),
            sContTpl = tplShowCont.content.cloneNode(tplShowCont),
            sTpl;

        document.querySelector('#main').appendChild(sContTpl);
        document.querySelector('#home-button').addEventListener('click', function() {
            view.loadHome();
        }, false);

        for (var date in events) {
            sTpl = tplShow.content.cloneNode(tplShow);
            sTpl.querySelector('.show-date').innerText = date;
            sTpl.querySelector('.show-description').innerText = events[date].primary.description;
            sTpl.querySelector('.show-category').innerText = events[date].primary.category;
            sTpl.querySelector('.show-subject').innerText = events[date].primary.subject;
            document.querySelector('#show-events').appendChild(sTpl);
        }
    },

    loadNewEventData: {
        // TODO REFACTOR!
        init: function() {
            var tplNew = document.querySelector('#new-event-tpl'),
                nTpl = tplNew.content.cloneNode(tplNew),
                date = createEvent.getDate();

            nTpl.querySelector('#new-date').innerText = date;

            document.querySelector('#main').appendChild(nTpl);

            document.querySelector('#home-button').addEventListener('click', function(e) {
                view.loadHome();
            }, false);

            document.querySelector('#submit-new-event')
                .addEventListener('click', function() {
                    if (createEvent.submitEvent.call(createEvent)) {
                        view.hide('new-event');
                        view.showEvents();
                    }
                }, false);

            this.loadCats();
        },

        loadCats: function() {
            var self = this,
                catList = document.querySelector('#new-cat-list'),
                cats = category.getCatList(),
                catsLength = cats.length,
                node, textNode;

            for (var i = 0; i < catsLength; i++) {
                node = document.createElement('LI');
                textNode = document.createTextNode(cats[i]);
                node.appendChild(textNode);
                catList.insertBefore(node, catList.childNodes[0]);
            }

            document.querySelector('#add-cat').removeAttribute('style');

            catList.addEventListener('click', function(e) {
                self.setCat.call(view.loadNewEventData, e);
                }, false);

        },

        setCat: function(event) {
            var self = this,
                littleCats;
            if (event.target.tagName === 'LI') {
                littleCats = document.querySelector('#new-cat-list').children;
                littleCats = Array.prototype.slice.call(littleCats);
                littleCats.forEach(function(el) {
                    el.className = el.className.replace(' active', '');
                });
                event.target.className += ' active';
                self.loadSubs(event.target.innerText);
            }
        },

        loadSubs: function(cat) {
            var self = this,
                subList = document.querySelector('#new-sub-list'),
                subs = subject.getSubList(cat),
                subsLength = subs.length,
                node, textNode;

            subList.innerHTML = '';

            for (var i = 0; i < subsLength; i++) {
                node = document.createElement('LI');
                textNode = document.createTextNode(subs[i]);
                node.appendChild(textNode);
                subList.insertBefore(node, subList.childNodes[0]);
            }

            document.querySelector('#add-sub').removeAttribute('style');

            subList.addEventListener('click', function(e) {
                self.setSub.call(view.loadNewEventData, e);
            }, false );
        },

        setSub: function(event) {
            var self = this,
                littleSubs;
            if (event.target.tagName === 'LI') {
                littleSubs = document.querySelector('#new-sub-list').children;
                littleSubs = Array.prototype.slice.call(littleSubs);
                littleSubs.forEach(function(el) {
                    el.className = el.className.replace(' active', '');
                });
                event.target.className += ' active';
            }
            // TODO REFACTOR!!!
            document.querySelector('#new-description').removeAttribute('style');
            document.querySelector('#new-description').addEventListener('input', function(e) {

                if(e.target.value !== null && e.target.value.trim() !== '') {
                    document.querySelector('#submit-new-event').removeAttribute('style');
                }
                else {
                    document.querySelector('#submit-new-event').style.display = 'none';
                }
            }, false);
        }
    },



    hide: function(path) {
        var toHide = document.querySelector('#' + path);

        // TODO Fancy animations and stuff...

        toHide.parentNode.removeChild(toHide);
    }
};

module.exports = view;

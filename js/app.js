var categories = require('./content/categories.js'),
    events = require('./content/events.js'),
    Router = require('./router.js');

var app = {

    view: 'home',

    initialise: function() {

        var newPath = Router.getPath();
        this.loadPathData(newPath);

        window.addEventListener('hashchange', function() {
            newPath = Router.getPath();
            this.loadPathData(newPath);
        }, false);
    },

    loadPathData: function(path) {
        switch(path) {
            case 'addEvent':
                this.loadNewEventData();
                break;
            default:
                return;
        }
    },

    loadNewEventData: function() {

        var loadCatList = function() {
            var catList = document.querySelector('#category'),
                option;
            for (var cat in categories) {
                option = document.createElement("OPTION");
                option.value = cat;
                catList.appendChild(option);
            }
            document.querySelector('#cat-select').addEventListener('change', loadSubList, false);
        };

        var loadSubList = function() {
            var subList = document.querySelector('#subject'),
                cat = document.querySelector('#cat-select'),
                option;

            if(categories[cat.value] !== undefined) {
                for (var sub in categories[cat.value].subjects) {
                    option = document.createElement("OPTION");
                    option.value = sub;
                    subList.appendChild(option);
                }
            }
            else {
                while(subList.firstChild) {
                    subList.removeChild(subList.firstChild);
                }
                cat.style.disabled = true;
            }

        };

        loadCatList();
    }

};


module.exports = app;

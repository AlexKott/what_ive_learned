var app = require('./app.js');

var Router = {

    list: {
        'home':true,
        'add-event':true,
        'show-events': true,
        'error':true,
        'e404':true

    },

    getPath: function() {
        if (window.location.hash.length !== 0) {
            var path = window.location.hash.slice(2);
            if (path.length === 0) {
                this.changeHome();
                return('home');
            }
            else {
                this.changeView(path);
                return(path);
            }
        }
        else {
            this.changeHome();
            return('home');
        }
    },

    changeHome: function() {
        this.changeView('home');
    },

    changeView: function(dir) {

        var found = false;

        for (var path in this.list) {
            if (path === dir && this.list[path]) {
                document.querySelector('#' + dir).style.display = 'block';
                found = true;
            }
            else {
                document.querySelector('#' + path).style.display = 'none';
            }
        }

        if(!found) {
            this.changeError(404);
        }
    },

    changeError: function(code) {
        switch(code) {
            case 404:
                this.changeView('e404');
                break;
            default:
                this.changeView('error');
        }
    }

};

module.exports = Router;

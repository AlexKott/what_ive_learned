var categories = require('./content/categories.js'),
    events = require('./content/events.js');

var newEvent = {

    loadNewEventData: function() {

        var checkDate = this.checkDate,
            dateSel = document.querySelector('#learndate'),
            catList = document.querySelector('#category'),
            subList = document.querySelector('#subject'),
            date = new Date(),
            option;


        var loadDate = function() {
            dateSel.value = date.toISOString().substring(0,10);
            dateSel.addEventListener('click', function() {checkDate.call(newEvent, dateSel);
                }, false);

            checkDate.call(newEvent, dateSel);
        };

        var loadCatList = function() {

            for (var cat in categories) {
                option = document.createElement("OPTION");
                option.value = cat;
                option.text = cat;
                catList.appendChild(option);
            }
            catList.addEventListener('click', function() { loadSubList(catList.value); }, false);
        };

        var loadSubList = function(cat) {

            // clear subList
            while(subList.length > 0) {
                subList.removeChild(subList.lastChild);
            }

            if(categories[cat] !== undefined) {
                for (var sub in categories[cat].subjects) {
                    option = document.createElement("OPTION");
                    option.value = sub;
                    option.text = sub;
                    subList.appendChild(option);
                }
            }
        };

        loadDate();
        loadCatList();
    },



    checkDate: function(dateSel) {

        var cDate = dateSel.value.replace(/-/g, ''),
            isDateOk = true;

        for (var learnDate in events) {
            if (learnDate === cDate) {
                isDateOk = false;
            }
        }

        if (isDateOk) {
            dateSel.className = dateSel.className.replace(' invalid', '');
        }
        else {
            dateSel.className = dateSel.className + ' invalid';
        }
    },
};


module.exports = newEvent;

var LearnEvent = require('./learn_event.js'),
    categories = require('./content/categories.js'),
    events = require('./content/events.js');

var newEvent = {

    eIndex: 0,
    learnDate: 0,
    secondaryOnly: false,

    initNewEvent: function() {

        var addSecEvent = this.addSecEvent,
            changeSecondaryOnly = this.changeSecondaryOnly,
            submitEvent = this.submitEvent;

        this.loadCategories(this.eIndex);

        this.loadDate(this.eIndex);

        if (this.eIndex === 0) {

            document.querySelector('#add-sec-event')
                .addEventListener('click', function() {
                    addSecEvent.call(newEvent);
                }, false );

            document.querySelector('#new-secondary-only')
                .addEventListener('click', function() {
                    changeSecondaryOnly.call(newEvent);
                }, false);

            document.querySelector('#submit-new-event')
                .addEventListener('click', function() {
                    submitEvent.call(newEvent);
                }, false);
        }
    },

    loadCategories: function(index) {
        var catList = document.querySelectorAll('.new-category')[index],
            subList = document.querySelectorAll('.new-subject')[index],
            option;

        // clear catList
        while (catList.length > 0) {
            catList.removeChild(catList.lastChild);
        }

        var loadCatList = function() {

            for (var cat in categories) {
                option = document.createElement("OPTION");
                option.value = cat;
                option.text = cat;
                catList.appendChild(option);
            }
            catList.addEventListener('click', function() {
                    loadSubList(catList.options[catList.selectedIndex].value);
                }, false);

            loadSubList();
        };

        var loadSubList = function(cat) {

            // clear subList
            while(subList.length > 0) {
                subList.removeChild(subList.lastChild);
            }

            if(categories[cat] !== undefined) {
                subList.className = subList.className.replace(' emptyList', '');
                for (var sub in categories[cat].subjects) {
                    option = document.createElement("OPTION");
                    option.value = sub;
                    option.text = sub;
                    subList.appendChild(option);
                }
            }
            else {
                subList.className = subList.className + ' emptyList';
            }

        };

        loadCatList();
    },

    loadDate: function(index) {

        var checkDate = this.checkDate,
            dateSel = document.querySelector('#new-learndate'),
            date = new Date(),
            option;

        var loadDate = function() {
            dateSel.value = date.toISOString().substring(0,10);
            dateSel.addEventListener('click', function() {
                    checkDate.call(newEvent, dateSel);
                }, false);

            checkDate.call(newEvent, dateSel);
        };

        loadDate();
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
            this.learnDate = cDate;
            dateSel.className = dateSel.className.replace(' warning', '');
        }
        else {
            this.learnDate = 0;
            dateSel.className = dateSel.className + ' warning';
        }
    },

    addSecEvent: function() {
        var eventSection = document.querySelector('#add-event'),
            eForm = document.querySelector('.new-event'),
            newChild = eForm.cloneNode(true);

        newChild.removeChild(newChild.querySelector('.new-milestone'));
        newChild.querySelector('.new-description').value = '';

        eventSection.appendChild(newChild);

        this.eIndex++;

        this.initNewEvent();
    },

    changeSecondaryOnly: function() {
        var primEvent = document.querySelectorAll('.new-event')[0];

        this.secondaryOnly = !this.secondaryOnly;

        if (this.eIndex === 0) {
            this.addSecEvent();
        }

        if (this.secondaryOnly) {
            primEvent.className = primEvent.className + ' new-sec-only';
        }
        else {
            primEvent.className = primEvent.className.replace(' new-sec-only', '');
        }


    },

    submitEvent: function() {
        // setup event for saving
        var date, eventList, eventListLength, type, fields = {}, i;

        date = this.learnDate;

        eventList = document.querySelectorAll('.new-event');
        eventListLength = eventList.length;

        if (this.secondaryOnly) i = 1;
        else i = 0;

        for (i; i < eventListLength; i++) {
            if (i === 0) {
                type = 'primary';
                fields.isMilestone = eventList[0].querySelector('.new-milestone').checked;
            }
            else {
                type = 'secondary';
                fields.isMilestone = false;
            }
            fields.category = eventList[i].querySelector('.new-category')
                .options[eventList[i].querySelector('.new-category').selectedIndex]
                .value;
            fields.subject = eventList[i].querySelector('.new-subject')
                .options[eventList[i].querySelector('.new-subject').selectedIndex]
                .value;
            fields.description = eventList[i].querySelector('.new-description').value;

            try {
                new LearnEvent(date, type, fields);
                console.log(events);
            }
            catch(error) {
                alert(error);
            }
        }


    }
};


module.exports = newEvent;

var LearnEvent = function(type, date) {
    this.type = type;

    if(date) {
        this.date = date;
    }
    else {
        var newDate = new Date();
        this.date = newDate.getFullYear().toString() + newDate.getMonth().toString() + newDate.getDate().toString();
    }

};


module.exports = LearnEvent;

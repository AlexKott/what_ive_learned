var data = {};
data.categories = require('./content/categories.js');
data.events = require('./content/events.js');

var dataControl = {

  saveToJson: function(fileName) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'save-data.php', true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('done!');
      }
    };
    xhr.send("filename=" + fileName + "&data=" + JSON.stringify(data[fileName]));
  }

};

module.exports = dataControl;

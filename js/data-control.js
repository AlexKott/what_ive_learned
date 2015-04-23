var dataControl = {

  events: {},

  categories: {},

  saveToJson: function(fileName) {
    var xhr = new XMLHttpRequest(),
        data = this[fileName];


    xhr.open('POST', 'save-data.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('done!');
      }
    };
    xhr.send("filename=" + fileName + "&data=" + JSON.stringify(data));
  },

  getFromJson: function(fileName) {
    var xhr = new XMLHttpRequest(),
        self = this,
        newData;

    xhr.open('GET', fileName +'.json', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        newData = JSON.parse(xhr.responseText);
        self[fileName] = newData;

        setTimeout(function() { console.log(self); }, 0 );
      }
    };
    xhr.send();
  }

};

module.exports = dataControl;

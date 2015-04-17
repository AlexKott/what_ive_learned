var uiQuery = {
  /*
    Visibility and value, effects to add
  */
  hideElem: function(e) {
    if (typeof e === 'string') {
      document.querySelector(e).style.display = 'none';
    }
    else {
      var eLength = e.length;
      for (var i = 0; i < eLength; i++) {
        document.querySelector(e[i]).style.display = 'none';
      }
    }
  },
  showElem: function(e) {
    if (typeof e === 'string') {
      document.querySelector(e).style.display = 'block';
    }
    else {
      var eLength = e.length;
      for (var i = 0; i < eLength; i++) {
        document.querySelector(e[i]).style.display = 'block';
      }
    }
  }
};

module.exports = uiQuery;

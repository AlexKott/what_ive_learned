var uiQuery = {
  /*
    Check if device has a touch event
  */
  checkTouch: function() {
    if ('ontouchstart' in document.documentElement) {
      this.clickAction = 'touchend';
    }
    else {
      this.clickAction = 'click';
    }
  },


  /*
    Visibility and value, effects to add
    TODO: add effects
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

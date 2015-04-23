// Tocca, by Gianluca Guarini (https://github.com/GianlucaGuarini/Tocca.js)
require('../node_modules/tocca/Tocca.js');

var Router = require('./router.js'),
    uiQuery = require('./ui-query.js');

var app = {
  initialise: function() {
    /*
      Loads user cache and categories.json.
      Initalises the Router.
    */

    // TODO Check in user cache for an event for today
    //      and show a specific button for that.

    // TODO Load categories from server. They are needed
    //      for any operation.

    new Router();
  }

};

window.addEventListener('load', function() {

  uiQuery.checkTouch();
  app.initialise();

// Polyfill for missing Template support
  (function templatePolyfill(d) {
    if('content' in d.createElement('template')) {
        return false;
    }
    var qPlates = d.getElementsByTagName('template'),
        plateLen = qPlates.length,
        elPlate,
        qContent,
        contentLen,
        docContent;

    for(var x=0; x<plateLen; ++x) {
        elPlate = qPlates[x];
        qContent = elPlate.childNodes;
        contentLen = qContent.length;
        docContent = d.createDocumentFragment();

        while(qContent[0]) {
            docContent.appendChild(qContent[0]);
        }

        elPlate.content = docContent;
    }
})(document);

});

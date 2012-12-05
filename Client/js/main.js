(function() {

var pages = window.ajrussell.require('pages');
var createBanner = window.ajrussell.require('widgets.createBanner');

var loadWindow = false;
var data = null;
var failed = false;

var init = function() {
  if(!data || !loadWindow) {
    return;
  }

  try {
    var main = document.createElement('div');
    document.body.appendChild(main);

    main.appendChild(createBanner(
      data.about.name,
      data.about.title
    ));

    var page_id = location.pathname.split('/');
    page_id.shift();
    if (page_id.length < 1) {
      page_id = ['Home'];
    }
    page_id = page_id.join('/');

    pages = pages.getPagesHandler();
    pages.setData(data);
    pages.gotoPage(page_id);

    main.appendChild(pages.getNode());
  } catch(e) {
    failed = true;
    logException(e);
    IncompatibleBrowser();
  }
};

function loaded() {
    loadWindow = true;
    if(failed) {
        IncompatibleBrowser();
    } else {
        init();
    }
}

(function getData() {
  try {
    var x = new XMLHttpRequest();
    x.open('GET', '/data.json', true);
    x.addEventListener(
      'readystatechange',
      function(e) {
        if(e.target.readyState === 4 && e.target.status === 200) {
          data = JSON.parse(e.target.responseText);
          init();
        }
      },
      false
    );
    x.send();
  } catch(e) {
    failed = true;
    logException(e);
    IncompatibleBrowser();
  }
})();

function logException(e) {
  if (console) {
    console.log(e.message);
    console.log(e.stack);
  }
}

function IncompatibleBrowser() {
  if (loadWindow) {
    document.body.innerHTML = '<div>Please use one of the following browsers<ul><li><a href="http://www.google.com/chrome/">Google Chrome</a></li><li><a href="http://www.mozilla.com">Mozilla Firefox</a></li></ul></div>';
  }
}

window.addEventListener('load', loaded, false);

})();


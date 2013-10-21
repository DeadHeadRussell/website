var data = {};
var page_handler = null;

(function() {

var loadWindow = false;
var loadData = false;
var failed = false;

var init = function() {
    if(!loadData || !loadWindow) {
        return;
    }

    try {
        var main = document.createElement('Div');
        document.body.appendChild(main);

        main.appendChild(CreateBanner(
            data.about.name,
            data.about.title
        ));

        page_handler = CreatePageHandler(main);
    } catch(e) {
        if (console) {
            console.log(e.message);
            console.log(e.stack);
        }
        failed = true;
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
        x.open('GET', '/data/', true);
        x.addEventListener(
            'readystatechange',
            function(e) {
                if(e.target.readyState === 4 && e.target.status === 200) {
                    data = JSON.parse(e.target.responseText);
                    loadData = true;
                    init();
                }
            },
            false
        );
        x.send();
    } catch(e) {
        failed = true;
        IncompatibleBrowser();
    }
})();

function IncompatibleBrowser() {
    if (loadWindow) {
        document.body.innerHTML = '<div>Please use one of the following browsers<ul><li><a href="http://www.google.com/chrome/">Google Chrome</a></li><li><a href="http://www.mozilla.com">Mozilla Firefox</a></li></ul></div>';
    }
}

window.addEventListener('load', loaded, false);

})();


var pages = null;

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

        var page = location.pathname.split('/');
        if (page[1].length == 0) {
            page = 'home';
        } else if (page[1] == 'soft') {
            page = 'software';
        } else {
            page = page[1];
        }

        var p = {
            'home': {
                text: 'Home',
                pageFunc: CreateHomePage
            },
            'music': {
                text: 'Music',
                pageFunc: CreateMusicPage
            },
            'software': {
                text: 'Software',
                pageFunc: CreateSoftPage
            },
            'resumes': {
                text: 'Resumes / CVs',
                pageFunc: CreateResumesPage
            }
        };

        for (var i in p) {
            if (window.history && window.history.pushState && i != page) {
                window.setTimeout(
                    (function(i) {
                        return function() {
                            p[i].page = p[i].pageFunc();
                        }
                    })(i),
                    0
                );
            } else if (i == page) {
                p[i].page = p[i].pageFunc();
            }
        }

        pages = CreatePageHandler(main, p, 'home');
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


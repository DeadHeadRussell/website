(function() {
 
window.ajrussell.register('pages', {
  getPagesHandler: getPagesHandler
});

var createHeader = window.ajrussell.require('widgets.createHeader');
var transitions = window.ajrussell.require('transitions');

var pages_handler = null;

function getPagesHandler() {
  if (!pages_handler) {
    pages_handler = createPagesHandler();
  }
  return pages_handler;
}

function createPagesHandler() {
  var root = document.createElement('Div');
  var header = createHeader(gotoPage);
  var pages = {};
  var aliases = {};
  var current_node = null;
  var data = null;

  root.className = 'main';
  root.appendChild(header.getNode());

  window.addEventListener('popstate', _popState, false);

  return {
    getNode: getNode,
    setData: setData,
    registerPage: registerPage,
    aliasPage: aliasPage,
    gotoPage: gotoPage
  };

  // Public API
  function getNode() {
    return root;
  }

  function setData(new_data) {
    data = new_data;
  }

  function aliasPage(page_id, other_page_id, add_to_header) {
    if (add_to_header) {
      header.add(page_id);
    }

    if (page_id && other_page_id && page_id.length > 0 &&
        other_page_id.length > 0) {
      page_id = page_id.toLowerCase();
      aliases[page_id] = other_page_id;

      if (pages[page_id]) {
        delete pages[page_id];
      }
    }
  }

  function registerPage(page_id, creation_callback, add_to_header) {
    if (add_to_header) {
      header.add(page_id);
    }

    if (page_id && page_id.length > 0 && creation_callback) {
      page_id = page_id.toLowerCase();
      pages[page_id] = {
        page_handler: _createPageHandler(page_id),
        creation_callback: creation_callback
      };

      if (aliases[page_id]) {
        delete aliases[page_id];
      }
    }
  }

  function gotoPage(page_id) {
    if (!page_id) {
      return;
    }

    root_page_id = page_id.toLowerCase();

    var sub_pages = [];
    while (!pages[root_page_id]) {
      page_ids = root_page_id.split('/');
      if (page_ids.length <= 1) {
        if (aliases[page_id]) {
          gotoPage(aliases[page_id]);
        }
        return;
      }
      sub_pages.push(page_ids.pop());
      root_page_id = page_ids.join('/');
    }

    var page_handler = pages[root_page_id].page_handler;
    var node = page_handler.getNode(sub_pages);

    if (current_node) {
      transitions.fade(current_node, node);
      _pushState(page_id);
    } else {
      root.appendChild(node);
      _replaceState(page_id);
    }
    current_node = node;
    header.select(page_id.split('/')[0]);
  }

  // Private functions
  function _createPageHandler(page_id) {
    var nodes = {};
    return {
      getId: function() { return page_id; },
      getNode: function(sub_pages) {
        if (!sub_pages) {
          sub_pages = []
        }

        sub_pages_id = sub_pages.join('/');
        if (!nodes[sub_pages_id]) {
          nodes[sub_pages_id] = pages[page_id].creation_callback(data, sub_pages);
        }
        return nodes[sub_pages_id];
      }
    };
  }

  function _pushState(page_id) {
    _modifyState('pushState', page_id);
  }

  function _replaceState(page_id) {
    _modifyState('replaceState', page_id);
  }
  
  function _modifyState(history_function, page_id) {
    if (!history_function) {
      return;
    }

    var url = '/' + page_id;
    window.history[history_function]({page_id: page_id}, escape(page_id), escape(url));
  }

  function _popState(e) {
    var state = e.state;
    if(state && state.page_id) {
        gotoPage(state.page_id);
    }
    return true;
  }
}

})();

var CreateSoftPage = function() {
    var resumeNode = document.createElement('Div');
    resumeNode.className = 'resumeWrapper';
    if(data.resumes.length > 0) {
        var linkNode = document.createElement('Div');
        linkNode.className = 'resumeLink';

        var createDocLink = function(type) {
            var link = document.createElement('A');
            link.href = '/resumes/' + data.resumes[0].path + '.' + type.toLowerCase();
            link.target = '_blank';
            link.appendChild(document.createTextNode(type.toUpperCase() + ' Version'));
            return link;
        };
        linkNode.appendChild(createDocLink('html'));
        linkNode.appendChild(createDocLink('pdf'));

        var x = new XMLHttpRequest();
        x.open('GET', '/resumes/' + data.resumes[0].path + '_part.html', true);
        x.addEventListener(
            'readystatechange',
            function(e) {
                if(e.target.readyState === 4 && e.target.status === 200) {
                    resumeNode.innerHTML = e.target.responseText;
                    resumeNode.insertBefore(linkNode, resumeNode.firstChild);
                }
            },
            false
        );
        x.send();
    }

    var projectsNode = document.createElement("Div");
    projectsNode.className = 'softwareProjects';
    for(var i = 0; i < data.personalProjects.length; i++) {
        p = data.personalProjects[i];
        var content = document.createElement('Div');

        var source = document.createElement('A');
        var githubdName = p.name.toLowerCase().replace(/ /g, '-');
        source.href = 'https://github.com/DeadHeadRussell/' + githubdName;
        source.appendChild(document.createTextNode('Source'));
        content.appendChild(source);

        var img = document.createElement('Img');
        img.src = '/img/soft/' + p.name + '.png';
        content.appendChild(img);

        var desc = document.createElement('P');
        desc.appendChild(document.createTextNode(p.description));
        content.appendChild(desc);

        projectsNode.appendChild(CreateSubSection(p.name, '', content));
    }

    var nav = CreateNavigation(
        "Navigation",
        {
            resume: { title: "Resume", node: resumeNode },
            projects: { title: "Projects", node: projectsNode }
        },
        '/soft/',
        'resume',
        onNavigationChange
    );

    var defaultSubPages = ['resume'];
    var obj = {
        node: nav.node,
        subPages: defaultSubPages,
        changeSubPage: function(subPages, samePage, noState) {
            if(!subPages || subPages.length < 1) {
                if(samePage) {
                    subPages = defaultSubPages;
                } else {
                    subPages = obj.subPages;
                }
            }

            subPages.splice(1);

            if(subPages[0] == 'projects') {
                nav.changePage(subPages[0], !samePage);
            } else {
                nav.changePage('resume', !samePage);
                subPages = ['resume'];
            }
            obj.subPages = subPages;
            if(!noState) {
                pages.pushState('soft', obj.subPages);
            }
        }
    };

    return obj;

    function onNavigationChange(id, previous) {
        if(id == previous) {
            return;
        }
        obj.subPages = [id];
        pages.pushState('soft', obj.subPages);
    }
};

var CreateAboutPage = function() {
    var node = document.createElement("Div");
    node.className = "about";
    var padding = document.createElement("Div");
    node.appendChild(padding);
    padding.appendChild(CreateSubSection('About', '', document.createTextNode("Alright, alright already.  Maybe this page won't get done for while.  Writing about yourself is hard.")));

    var obj = {
        node: node,
        subPages: [],
        changeSubPage: function(subPages, samePage, noState) {
            obj.subPages = [];
            if(!noState) {
                pages.pushState('about', obj.subPages);
            }
        }
    };

    return obj;
};


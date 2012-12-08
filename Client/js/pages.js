var CreatePageHandler = function(node, pages, init) {
  var subPages = location.pathname.split('/');
  subPages.shift();
  var initPage = subPages.shift();
  if(initPage !== '') {
    init = initPage;
  }

  var page = null;

  var main = document.createElement('Div');
  main.className = 'Main';
  node.appendChild(main);

  var header = CreateHeader(pages, select, init, subPages);
  var audioPlayer = CreateAudioPlayer();

  node.insertBefore(header.node, main);
  node.appendChild(audioPlayer.getNode());

  window.addEventListener('popstate', popState, false);

  obj = {
    gotoPage: function(id, subPages) {
      header.select(id, subPages);
    },
    pushState: pushState,
    replaceState: replaceState,
    audioPlayer: audioPlayer
  };

  return obj;

  function modifyState(id, subPages, functionName) {
    var url = '/' + id;
    if(subPages && subPages.length > 0) {
      url += '/' + subPages.join('/');
    }
    if(history[functionName]) {
      history[functionName](
        { id: id, subPages: subPages },
        escape(id),
        escape(url)
      );
    }
  }

  function pushState(id, subPages) {
    modifyState(id, subPages, 'pushState');
   }

  function replaceState(id, subPages) {
    modifyState(id, subPages, 'replaceState');
  }

  function popState(e) {
    var s = e.state;
    if(s && s.id) {
      header.select(s.id, s.subPages, true);
    }
    return true;
  }

  function select(id, callback) {
    var newPage = pages[id].page;
    if(page) {
      transition.fade(
        main, newPage.node,
        function(status) {
          if(status == transition.SUCCESS) {
            page = newPage;
          }
          if(callback) {
            callback(status);
          }
        }
      );
    } else {
      main.appendChild(newPage.node);
      page = newPage;
      callback(transition.STARTING);
      replaceState(id, newPage.subPages);
    }
  }
};

var CreateHomePage = function() {
  var node = document.createElement("Div");

  var elems = [
    {id: 'music', title: 'Music', path: '/music', imgSrc: '/img/music/main.jpg'},
    {id: 'soft', title: 'Software', path: '/soft',  imgSrc: '/img/soft/main.jpg'},
    {id: 'resume', title: 'Resumes', path: '/resume', imgSrc: '/img/resume/main.jpg'}
  ];

  var content = document.createElement('Div');
  content.className = 'home';

  var head = document.createElement('Div');
  head.className = 'head';
  var h1 = document.createElement('H1');
  h1.appendChild(document.createTextNode('Welcome.'));
  head.appendChild(h1);
  var intro = document.createElement('Div');
  intro.appendChild(document.createTextNode(data.intro));
  head.appendChild(intro);
  content.appendChild(head);

  var links = CreateBoxView(elems, goToPage);
  content.appendChild(links);

  var sitesList = [];
  for(var i = 0; i < data.sites.length; i++) {
    var site = data.sites[i];
    var siteNode = document.createElement('Div');
    var titleNode = document.createElement('Div');
    var linkNode = document.createElement('A');
    linkNode.appendChild(document.createTextNode(site.name));
    linkNode.href = site.link;
    linkNode.setAttribute('target', '_blank');
    titleNode.appendChild(linkNode);
    siteNode.appendChild(titleNode);
    var descNode = document.createElement('Div');
    descNode.appendChild(document.createTextNode(site.desc));
    siteNode.appendChild(descNode);
    sitesList.push({
      id: site.name,
      node: siteNode
    });
  }
  var sites = CreateList('Awesome Sites', sitesList);
  sites.className += ' sites';
  content.appendChild(sites);

  var contactEmail = {
    id: 'contactEmail',
    node: document.createElement('A')
  };
  contactEmail.node.appendChild(document.createTextNode(data.contact.email));
  contactEmail.node.href = 'mailto:' + data.contact.email;
  var contact = CreateList('Contact', [ contactEmail ]);
  contact.className += ' contact';
  content.appendChild(contact);

  node.appendChild(content);

  var obj = {
    node: node,
    subPages: [],
    changeSubPage: function(subPages, samePage, noState) {
      obj.subPages = [];
      if(!noState) {
        pages.pushState('home', obj.subPages);
      }
    }
  };

  return obj;

  function goToPage(elem) {
    pages.gotoPage(elem.id);
    return true;
  }
};

var CreateMusicPage = function() {
  var currentArtists = [];
  var previousArtists = [];
  for(var i = 0; i < data.artists.length; i++) {
    var artist = data.artists[i];
    var artistNode = document.createElement("Div");
    artistNode.className = 'artist';

    var aImg = document.createElement("Img");
    aImg.src = '/img/music/' + artist.name + '/main.jpg';
    aImg.alt = '';
    artistNode.appendChild(aImg);
    var text = document.createElement("Div");
    text.appendChild(document.createTextNode(artist.description));
    artistNode.appendChild(text);
    
    for(var j = 0; j < artist.albums.length; j++) {
      var album = artist.albums[j];
      var content = document.createElement('Div');

      var img = document.createElement('Img');
      img.addEventListener(
        'error',
        function(e) {
          e.target.parentNode.removeChild(e.target);
        },
        false
      );
      img.src = '/img/music/' + artist.name + '/' + album.name + '.png';
      img.alt = '';
      content.appendChild(img);

      var div = document.createElement('Div');
      div.appendChild(document.createTextNode(album.description));
      content.appendChild(div);

      var albumNode = CreateSubSection(album.name, '', content);
      
      if (album.link) {
        var link = document.createElement('A');
        link.appendChild(document.createTextNode(album.link));
        link.href = album.link;
        link.setAttribute('target', '_blank');
        link.className = 'Content';
        albumNode.appendChild(link);
      }

      var desc = document.createElement('Div');
      desc.className = 'description';
      desc.appendChild(document.createTextNode(' '));
      desc.setAttribute('aria-live', 'polite');

      var dispDesc = function(desc) {
        return function(obj) {
          var text = document.createElement('Div');
          var title = document.createElement('Div');
          title.className = "title";
          title.appendChild(document.createTextNode(obj.text));
          var descText = obj.desc.replace(/\n/g, '</div><div>');
          descText = '<div>' + descText + '</div>';
          text.innerHTML = descText;
          text.insertBefore(title, text.firstChild);
          desc.replaceChild(text, desc.firstChild);
          desc.style.paddingLeft = (desc.previousSibling.offsetWidth + 35) + 'px';
        }
      }(desc);

      var songs = [];
      for(var k = 0; album.songs && k < album.songs.length; k++) {
        var song = album.songs[k];
        var id = i + '/' + j + '/' + k;
        var node = document.createElement("Div");

        var obj = {id: id, node: node, text: song.name, desc: song.description, callback: dispDesc};

        if(song.recording) {
          var img = document.createElement("Div");
          img.className = 'control play';
          img.setAttribute('role', 'button');
          node.appendChild(img);

          song.callback = function(img, dispDesc, obj) {
            return function(playing) {
              if(playing) {
                img.className = 'control pause';
              } else {
                img.className = 'control play';
              }
              dispDesc(obj);
            }
          }(img, dispDesc, obj);

          var play = function(id) {
            return function(e) {
              pages.audioPlayer.toggle(id);
              return true;
            };
          }(id);
          img.addEventListener('keydown', keyToClick(play), false);
        }

        var span = document.createElement("Span");
        span.appendChild(document.createTextNode(song.name));
        node.appendChild(span);

        songs.push(obj);
      }

      var songClicked = function(obj) {
          pages.audioPlayer.toggle(obj.id);
      };

      if(album.songs && album.songs.length > 0) {
        var list = CreateList('Tracks', songs, songClicked);
        albumNode.appendChild(list);
        albumNode.appendChild(desc);
      }
      artistNode.appendChild(albumNode);
    }

    var backNode = document.createElement("A");
    backNode.href = '/music/artists';
    backNode.className = 'back';
    backNode.addEventListener('click', function(e) { return preventDefaultLink(e); }, false);
    backNode.addEventListener('click', displayArtists, false);
    backNode.addEventListener('keydown', keyToClick(displayArtists), false);
    backNode.setAttribute('role', 'button');
    backNode.setAttribute('tabindex', '0');
    backNode.setAttribute('title', 'Back');

    var sectionNode = document.createElement("Div");
    sectionNode.appendChild(CreatePageTitle(artist.name));
    sectionNode.appendChild(backNode);
    sectionNode.appendChild(artistNode);
    
    var tempObj = {
      id: artist.name,
      title: artist.name,
      path: '/music/artists/' + artist.name,
      imgSrc: aImg.src,
      content: sectionNode
    };
    if(artist.end) {
      previousArtists.push(tempObj);
    } else {
      currentArtists.push(tempObj);
    }
  }

  var equipments = [];
  for(var i = 0; i < data.equipment.length; i++) {
    e = data.equipment[i];
    var tiles = [];

    var equipment = {
      id: e.name,
      title: e.name,
      path: '/music/equipment/' + e.name,
      imgSrc: '/img/equipment/' + e.name + '/main.jpg'
    };

    for(var j = 0; j < e.equipment.length; j++) {
      var ee = e.equipment[j];

      var navigateBack = (function(equipment) {
        return function() {
          displayEquipment(equipment);
        }
      })(equipment);

      var backNode = document.createElement("A");
      backNode.href = '/music/equipment/' + e.name;
      backNode.className = 'back';
      backNode.addEventListener('click', function(e) { return preventDefaultLink(e); }, false);
      backNode.addEventListener('click', navigateBack, false);
      backNode.addEventListener('keydown', keyToClick(navigateBack), false);
      backNode.setAttribute('role', 'button');
      backNode.setAttribute('tabindex', '0');
      backNode.setAttribute('title', 'Back');

      var img = document.createElement('Img');
      img.src = '/img/equipment/' + e.name + '/' + ee.name + '.jpg';

      var content = document.createElement("Div");
      content.appendChild(img);

      var largeImage = document.createElement("Div");
      largeImage.appendChild(CreatePageTitle(ee.name));
      largeImage.appendChild(backNode);
      largeImage.appendChild(content);

      tiles.push({
        id: ee.name,
        title: ee.name,
        path: '/music/equipment/' + e.name + '/' + ee.name,
        imgSrc: '/img/equipment/' + e.name + '/' + ee.name + '.jpg',
        content: largeImage,
        type: e.name
      });
    }

    var backNode = document.createElement("A");
    backNode.href = '/music/equipment';
    backNode.className = 'back';
    backNode.addEventListener('click', function(e) { return preventDefaultLink(e); }, false);
    backNode.addEventListener('click', displayEquipmentList, false);
    backNode.addEventListener('keydown', keyToClick(displayEquipmentList), false);
    backNode.setAttribute('role', 'button');
    backNode.setAttribute('tabindex', '0');
    backNode.setAttribute('title', 'Back');

    var content = CreateBoxView(tiles, displayEquipmentImage);

    var sectionNode = document.createElement("Div");
    sectionNode.className = 'equipmentSection';
    sectionNode.appendChild(CreatePageTitle(e.name));
    sectionNode.appendChild(backNode);
    sectionNode.appendChild(content);

    equipment.content = sectionNode;
    equipment.tiles = tiles;
    equipments.push(equipment);
  }

  var artistsNode = document.createElement("Div");
  artistsNode.className = 'artists';
  var artistsContent = document.createElement("Div");
  artistsNode.appendChild(artistsContent);

  var artistsListNode = document.createElement("Div");
  var currentArtistsNode  = CreateSubSection("Current Acts", "", CreateBoxView(currentArtists, displayArtist));
  var previousArtistsNode = CreateSubSection("Previous Acts", "", CreateBoxView(previousArtists, displayArtist));
  artistsListNode.appendChild(CreatePageTitle("Related Acts"));
  artistsListNode.appendChild(currentArtistsNode);
  artistsListNode.appendChild(previousArtistsNode);
  artistsContent.appendChild(artistsListNode);

  var equipmentNode = document.createElement("Div");
  equipmentNode.className = 'equipment';
  equipmentContent = document.createElement("Div");
  equipmentNode.appendChild(equipmentContent);

  var equipmentListNode = document.createElement("Div");
  var equipmentBoxView = CreateBoxView(equipments, displayEquipment);
  equipmentListNode.appendChild(CreatePageTitle("Equipment"));
  equipmentListNode.appendChild(equipmentBoxView);
  equipmentContent.appendChild(equipmentListNode);

  var nav = CreateNavigation(
    'Navigation',
    {
      artists: {title: 'Related Acts', node: artistsNode},
      equipment: {title: 'Equipment', node: equipmentNode}
    },
    '/music/',
    'artists',
    navigationPageChanged
  );

  var defaultSubPages = ['artists'];
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

      if(subPages[0] == 'artists') {
        if(subPages.length > 1) {
          var artists = currentArtists.concat(previousArtists);
          subPages[1] = unescape(subPages[1]);
          for(var i = 0; i < artists.length; i++) {
            if(artists[i].title === subPages[1]) {
              displayArtist(artists[i], samePage, noState);
              return;
            }
          }
        }
        displayArtists(samePage, noState);
        return;
      } else if(subPages[0] == 'equipment') {
        if(subPages.length > 1) {
          subPages[1] = unescape(subPages[1]);
          for(var i = 0; i < equipments.length; i++) {
            var equipment = equipments[i];
            if(equipment.title === subPages[1]) {
              if (subPages[2]) {
                subPages[2] = unescape(subPages[2]);
                for(var j = 0; j < equipment.tiles.length; j++) {
                  var tile = equipment.tiles[j];
                  if (tile.title === subPages[2]) {
                    displayEquipmentImage(tile, samePage, noState);
                    return;
                  }
                }
              }
              displayEquipment(equipments[i], samePage, noState);
              return;
            }
          }
        }
        displayEquipmentList(samePage, noState);
        return;
      }
    }
  };

  return obj;

  function display(root, elem, subPages, samePage, noState) {
    samePage = samePage !== false;
    if(!samePage) {
      root.replaceChild(elem, root.firstChild);
      nav.changePage(subPages[0], !samePage);
      obj.subPages = subPages;
      if(!noState) {
        pages.pushState('music', obj.subPages);
      }
    } else {
      transition.fade(
        root, elem,
        function(status) {
          if(status == transition.SUCCESS) {
            nav.changePage(subPages[0], !samePage);
          }
          if(status == transition.STARTING) {
            obj.subPages = subPages;
            if(!noState) {
              pages.pushState('music', obj.subPages);
            }
          }
        }
      );
    }
  }

  function displayEquipmentImage(elem, samePage, noState) {
    display(equipmentContent, elem.content, ['equipment', elem.type, elem.title], samePage, noState);
  }

  function displaySingle(root, elem, id, samePage, noState) {
    var subPages = [id, elem.title];
    display(root, elem.content, subPages, samePage, noState);
  }

  function displayArtist(elem, samePage, noState) {
    displaySingle(artistsContent, elem, 'artists', samePage, noState);
    return true;
  }

  function displayEquipment(elem, samePage, noState) {
    displaySingle(equipmentContent, elem, 'equipment', samePage, noState);
    return true;
  }

  function displayList(root, elem, id, samePage, noState) {
    var subPages = [id];
    display(root, elem, subPages, samePage, noState);
  }

  function displayArtists(samePage, noState) {
    displayList(artistsContent, artistsListNode, 'artists', samePage, noState);
  }

  function displayEquipmentList(samePage, noState) {
    displayList(equipmentContent, equipmentListNode, 'equipment', samePage, noState);
  }

  function navigationPageChanged(id, previous) {
    var root = id === 'artists' ? artistsContent : equipmentContent;
    var listChild = id === 'artists' ? artistsListNode : equipmentListNode;
    if(root.firstChild === listChild) {
      if(id != previous) {
        obj.subPages = [id];
        pages.pushState('music', obj.subPages);
      }
      return;
    }

    var child = root.children[0];

    if(id == previous) {
      if(id == 'artists') {
        displayArtists();
      } else {
        displayEquipmentList();
      }
      return;
    }

    var children = id === 'artists' ? currentArtists.concat(previousArtists) : equipments;
    for(var i in children) {
      if(child == children[i].content) {
        obj.subPages = [id, children[i].title];
        pages.pushState('music', obj.subPages);
        return;
      }
    }

    displayArtists();
  }
};

var CreateSoftPage = function() {
  var projectsNode = document.createElement("Div");
  projectsNode.className = 'softwareProjects';

  var projects = [];
  for(var i = 0; i < data.softwareProjects.length; i++) {
    var p = data.softwareProjects[i];

    var project = {
      id: p.name,
      title: p.name,
      path: 'https://github.com/deadheadrussell/' + escape(p.repository_name),
      imgSrc: '/img/soft/' + p.name + '.png'
    };

    projects.push(project);
  }

  projectsNode.appendChild(CreateBoxView(projects));

  var schoolNode = document.createElement('div');
  schoolNode.className = 'softwareProjects';
  for (var i = 0; i < data.schoolProjects.length; i++) {
    var project = data.schoolProjects[i];

    var descriptionNode = document.createElement('span');
    descriptionNode.appendChild(document.createTextNode(project.description));
    var projectNode = CreateSubSection(project.course, '', descriptionNode);
    schoolNode.appendChild(projectNode);
  }

  var workNode = document.createElement('div');
  workNode.className = 'softwareProjects';
  for (var i = 0; i < data.workProjects.length; i++) {
    var project = data.workProjects[i];

    var descriptionNode = document.createElement('span');
    descriptionNode.appendChild(document.createTextNode(project.description));
    var projectNode = CreateSubSection(project.name, project.company, descriptionNode);
    workNode.appendChild(projectNode);
  }

  var subPagesNav = {
    projects: { title: "Personal Projects", node: projectsNode },
    school: { title: "School Projects", node: schoolNode },
    work: { title: "Work Projects", node: workNode }
  };

  var nav = CreateNavigation(
    "Navigation",
    subPagesNav,
    '/soft/',
    'projects',
    onNavigationChange
  );

  var defaultSubPages = ['projects'];
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

      if(!(subPages[0] in subPagesNav)) {
        nav.changePage('projects', !samePage);
        subPages = ['projects'];
      }
        nav.changePage(subPages[0], !samePage);
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

var CreateResumesPage = function() {
  var resumes = {};
  for (var i = 0; i < data.resumes.length; i++) {
    var resume = data.resumes[i];

    var resumeNode = document.createElement('Div');
    resumeNode.className = 'resumeWrapper';

    var linkNode = document.createElement('Div');
    linkNode.className = 'resumeLink';

    var createDocLink = function(type) {
      var link = document.createElement('A');
      link.href = '/resumes/' + resume.name + '/full.' + type.toLowerCase();
      link.target = '_blank';
      link.appendChild(document.createTextNode('Download ' + type.toUpperCase()));
      return link;
    };
    linkNode.appendChild(createDocLink('html'));
    linkNode.appendChild(createDocLink('pdf'));

    var x = new XMLHttpRequest();
    x.open('GET', '/resumes/' + resume.name + '/part.html', true);
    x.addEventListener(
      'readystatechange',
      function(resumeNode, linkNode) {
        return function(e) {
          if(e.target.readyState === 4 && e.target.status === 200) {
            console.log(e);
            resumeNode.innerHTML = e.target.responseText;
            resumeNode.insertBefore(linkNode, resumeNode.firstChild);
          }
        };
      }(resumeNode, linkNode),
      false
    );
    x.send();

    resumes[resume.name] = {
      title: resume.name,
      node: resumeNode
    };
  }

  var defaultResume = data.resumes[0].name;

  var nav = CreateNavigation(
    "Navigation",
    resumes,
    '/resume/',
    defaultResume,
    onNavigationChange
  );

  var obj = {
    node: nav.node,
    subPages: [],
    changeSubPage: function(subPages, samePage, noState) {
      if (!subPages || subPages.length < 1) {
        if (samePage) {
          subPages = defaultSubPages;
        } else {
          subPages = obj.subPages;
        }
      }

      subPages.splice(1);

      var found = false;
      for (var resume in resumes) {
        if (resumes.hasOwnProperty(resume)) {
          if (resume == subPages[0]) {
            nav.changePage(resume, !samePage);
            found = true;
          }
        }
      }

      if (!found) {
        nav.changePage(defaultResume, !samePage);
        subPages = [defaultResume];
      }

      obj.subPages = subPages;
      if(!noState) {
        pages.pushState('resume', obj.subPages);
      }
    }
  };

  return obj;

  function onNavigationChange(id, previous) {
    if (id == previous) {
      return;
    }
    obj.subPages = [id];
    pages.pushState('resume', obj.subPages);
  }
};


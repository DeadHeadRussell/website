var pages = {};

function AddPage(id) {
  pages[id] = {
    id: id,
    page: (window['CreatePage_' + id.replace('/', '_')])()
  };
}

function AddMap(id, to) {
  pages[id] = {
    id: id,
    map: to
  };
}

function CreatePages() {
  AddPage('home');
  AddMap('music', 'music/artists');
  AddPage('music/artists');
  AddPage('music/equipment');
  AddMap('software', 'sofware/personal');
  AddPage('software/personal');
  AddPage('software/school');
  AddPage('software/work');
  AddMap('resumes', 'resumes/software');
  AddPage('resumes/software');
  AddPage('resumes/music_tech');
}

var CreatePageHandler = function(node) {
  CreatePages();

  var page = null;
  var init_id = location.pathname.substr(1);
  if (!init_id) {
    init_id = 'home';
  }

  while (!pages[init_id].page) {
    init_id = pages[init_id].map;
  }

  var main = document.createElement('Div');
  main.className = 'Main PageWidth';

  var navigation = CreateNavigation(
    [
      CreateImageNav('Home', 'home', '/data/images/about/' + data.about.image),
      CreateHeaderNav('Music'),
      CreateNav('Artists', 'music/artists'),
      CreateNav('Equipment', 'music/equipment'),
      CreateHeaderNav('Projects'),
      CreateNav('Personal', 'software/personal'),
      CreateNav('School', 'software/school'),
      CreateNav('Work', 'software/work'),
      CreateHeaderNav('Resumes'),
      CreateNav('Software Engineering', 'resumes/software'),
      CreateNav('Music and Technology', 'resumes/music_tech'),
    ],
    init_id,
    select
  );
  var audioPlayer = CreateAudioPlayer();

  main.insertBefore(navigation.node, main.firstChild);
  node.appendChild(main);
  node.appendChild(audioPlayer.getNode());

  window.addEventListener('popstate', popState, false);

  obj = {
    gotoPage: function(id) {
      if (!pages[id].page) {
        return gotoPage(pages[id].to);
      }
      navigation.select(id);
    },
    audioPlayer: audioPlayer
  };

  return obj;

  function modifyState(id, functionName) {
    var url = '/' + id;
    if(history[functionName]) {
      history[functionName](
        { id: id },
        escape(id),
        escape(url)
      );
    }
  }

  function pushState(id) {
    modifyState(id, 'pushState');
   }

  function replaceState(id) {
    modifyState(id, 'replaceState');
  }

  function popState(e) {
    var s = e.state;
    if(s && s.id) {
      navigation.select(s.id, true);
    }
    return true;
  }

  function select(id, no_state) {
    var newPage = pages[id].page;
    if(page) {
      main.replaceChild(newPage.node, page.node);

      if (!no_state) {
        pushState(id);
      }
    } else {
      main.appendChild(newPage.node);
      if (!no_state) {
        replaceState(id, newPage.subPages);
      }
    }
    page = newPage;
  }
};

function CreatePage_home() {
  var elems = [
    {id: 'music/artists', title: 'Music', path: '/music/artists', imgSrc: '/images/music.jpg'},
    {id: 'software', title: 'Software', path: '/software',  imgSrc: '/images/software.jpg'},
    {id: 'resumes', title: 'Resumes', path: '/resumes', imgSrc: '/images/resumes.jpg'}
  ];

  var content = document.createElement('Div');
  content.className = 'home Page three_box';

  var head = CreatePageHead('Welcome.', '');
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

  var obj = {
    node: content,
    subPages: [],
    changeSubPage: function(subPages, samePage, noState) {
      obj.subPages = [];
      if(!noState) {
        page_handler.pushState('home', obj.subPages);
      }
    }
  };

  return obj;

  function goToPage(elem) {
    page_handler.gotoPage(elem.id);
    return true;
  }
}

function CreatePage_music() {
  return CreatePage_music_artists();
}

function CreatePage_music_artists() {
  var box_objects = [];
  for (var i = 0; i < data.artists.length; i++) {
    var artist = data.artists[i];

    box_objects.push({
      id: artist.name,
      title: artist.name,
      path: '/music/artists/' + artist.name,
      imgSrc: '/data/images/artists/' + artist.name + '/main.jpg'
    });
  }

  var node = document.createElement('div');
  node.className = 'artists Page three_box';

  node.appendChild(CreatePageHead('Artists', ''));
  node.appendChild(CreateBoxView(box_objects, GotoArtist));

  return {
    node: node
  };

  function GotoArtist(id) {
    page_handler.select(id);
  }
}

function CreatePage_music_equipment() {
  var box_objects = [];
  for(var i = 0; i < data.equipment.length; i++) {
    var equipment = data.equipment[i];

    box_objects.push({
      id: equipment.name,
      title: equipment.name,
      path: '/music/equipment/' + equipment.name,
      imgSrc: '/data/images/equipment/' + equipment.name + '/main.jpg'
    });
  }

  var node = document.createElement('div');
  node.className = 'equipment Page two_box';

  node.appendChild(CreatePageHead('Equipment', ''));
  node.appendChild(CreateBoxView(box_objects, GotoEquipment));

  return {
    node: node
  };

  function GotoEquipment(id) {
    page_handler.select(id);
  }
}

function CreatePage_software() {
  return CreatePage_software_personal();
}

function CreatePage_software_personal() {
  var projects_node = document.createElement('div');
  projects_node.className = 'softwareProjects Page';

  var projects = [];
  for(var i = 0; i < data.softwareProjects.length; i++) {
    var project = data.softwareProjects[i];

    var project = {
      id: project.name,
      title: project.name,
      path: 'https://github.com/deadheadrussell/' + escape(project.repository_name),
      imgSrc: '/data/images/personalProjects/' + project.name + '.png'
    };

    projects.push(project);
  }

  projects_node.appendChild(CreatePageHead('Personal Projects', ''));
  projects_node.appendChild(CreateBoxView(projects));

  return {
    node: projects_node
  };
}

function CreatePage_software_school() {
  var school_node = document.createElement('div');
  school_node.className = 'softwareProjects Page';

  school_node.appendChild(CreatePageHead('School Projects', ''));

  for (var i = 0; i < data.schoolProjects.length; i++) {
    var project = data.schoolProjects[i];

    var descriptionNode = document.createElement('span');
    descriptionNode.appendChild(document.createTextNode(project.description));

    var projectNode = CreateSubSection(project.course, '', descriptionNode);
    school_node.appendChild(projectNode);
  }

  return {
    node: school_node
  };
}

function CreatePage_software_work() {
  var work_node = document.createElement('div');
  work_node.className = 'softwareProjects Page';

  work_node.appendChild(CreatePageHead('Work Projects', ''));
  
  for (var i = 0; i < data.workProjects.length; i++) {
    var project = data.workProjects[i];

    var descriptionNode = document.createElement('span');
    descriptionNode.appendChild(document.createTextNode(project.description));

    var projectNode = CreateSubSection(project.name, project.company, descriptionNode);
    work_node.appendChild(projectNode);
  }

  return {
    node: work_node
  };
}

function CreatePage_resumes() {
  return CreatePage_resumes_software();
}

function CreatePage_resumes_software() {
  return createResumePage(0);
}

function CreatePage_resumes_music_tech() {
  return createResumePage(1);
}

function createResumePage(id) {
  var resume = data.resumes[id];
  
  var resume_node = document.createElement('Div');
  resume_node.className = 'resumeWrapper Page';

  var x = new XMLHttpRequest();
  x.open('GET', '/data/resumes/' + resume.name + '/part.html', true);
  x.addEventListener(
    'readystatechange',
    function(resume_node) {
      return function(e) {
        if(e.target.readyState === 4 && e.target.status === 200) {
          console.log(e);
          resume_node.innerHTML = e.target.responseText;
          resume_node.insertBefore(resume_node.firstChild);
        }
      };
    }(resume_node),
    false
  );
  x.send();

  return {
    node: resume_node
  };
}


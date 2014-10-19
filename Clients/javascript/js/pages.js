var pages = {};

function AddPage(id) {
  pages[id] = {
    id: id,
    page: (window['CreatePage_' + id.replace(/\//g, '_')])()
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
  AddPage('music/artists/solo');
  AddPage('music/artists/cam_jervis_experience');
  AddPage('music/artists/the_orfs');
  AddPage('music/equipment');
  AddPage('music/equipment/guitars');
  AddPage('music/equipment/pedals');
  AddPage('music/equipment/amps');
  AddPage('music/equipment/keyboards');
  AddPage('music/equipment/mixers');
  AddPage('music/equipment/microphones');
  AddMap('software', 'software/personal');
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

  if (!pages[init_id]) {
    init_id = init_id.substr(0, init_id.indexOf('/'));
    if (!pages[init_id]) {
      init_id = 'home';
    }
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
      CreateSubNav('Solo Works', 'music/artists/solo'),
      CreateSubNav('Cam Jervis Experience', 'music/artists/cam_jervis_experience'),
      CreateSubNav('The Orfs', 'music/artists/the_orfs'),
      CreateNav('Equipment', 'music/equipment'),
      CreateSubNav('Guitars', 'music/equipment/guitars'),
      CreateSubNav('Guitar Pedals', 'music/equipment/pedals'),
      CreateSubNav('Guitar Amplifiars', 'music/equipment/amps'),
      CreateSubNav('Keyboards', 'music/equipment/keyboards'),
      CreateSubNav('Mixing Boards', 'music/equipment/mixers'),
      CreateSubNav('Microphones', 'music/equipment/microphones'),
      CreateHeaderNav('Projects'),
      CreateNav('Personal', 'software/personal'),
      CreateNav('School', 'software/school'),
      CreateNav('Work', 'software/work'),
      CreateHeaderNav('Resumes'),
      CreateNav('Software Engineering', 'resumes/software'),
      //CreateNav('Music and Technology', 'resumes/music_tech'),
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
        return obj.gotoPage(pages[id].map);
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
    window.scrollTo(0, 0);
  }
};

function CreatePage_home() {
  var elems = [
    {id: 'music', title: 'Music', path: '/music/artists', imgSrc: '/images/music.jpg'},
    {id: 'software', title: 'Software', path: '/software',  imgSrc: '/images/software.jpg'},
    {id: 'resumes', title: 'Resumes', path: '/resumes', imgSrc: '/images/resumes.jpg'},
    {title: 'Contact', text: 'deadhead.russell@gmail.com'}
  ];

  var content = document.createElement('Div');
  content.className = 'home Page';

  var links = CreateStream(elems, goToPage);
  content.appendChild(links);

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

function CreatePage_music_artists() {
  var box_objects = [];
  for (var i = 0; i < data.artists.length; i++) {
    var artist = data.artists[i];

    box_objects.push({
      id: artist.name,
      title: artist.name,
      path: 'music/artists/' + artist.id,
      imgSrc: '/data/images/artists/' + artist.name + '/main.jpg'
    });
  }

  var node = document.createElement('div');
  node.className = 'artists Page';

  node.appendChild(CreateStream(box_objects, GotoArtist));

  return {
    node: node
  };

  function GotoArtist(id) {
    page_handler.gotoPage(id.path);
  }
}

function createArtist(id) {
  var artist = null;
  var artist_index = -1;
  for (var i = 0; i < data.artists.length; i++) {
    if (data.artists[i].id == id) {
      artist = data.artists[i];
      artist_index = i;
      break;
    }
  }

  var posts = [];
  posts.push({
    title: artist.name,
    subtitle: artist.start,
    imgSrc: '/data/images/artists/' + artist.name + '/main.jpg',
    text: artist.description
  });

  for (var i = 0; i < artist.albums.length; i++) {
    var album = artist.albums[i];
    var post = {
      title: album.name,
      link: !album.songs.length && album.link,
      content: createAlbum(album, artist_index + '/' + i)
    };

    posts.push(post);
  }

  var node = document.createElement('div');
  node.className = 'artist Page';
  node.appendChild(CreateStream(posts));

  return node;

  function createAlbum(album, index) {
    var root = document.createElement('div');
    root.className = 'album';

    if (album.songs.length == 0) {
      var img = document.createElement('img');
      img.src = '/data/images/artists/' + artist.name + '/' + album.name + '.png';
      root.appendChild(img);
    }

    var desc = document.createElement('p');
    desc.innerHTML = album.description;
    root.appendChild(desc);

    if (album.songs.length > 0) {
      if (album.link) {
        var link = document.createElement('a');
        link.textContent = album.link;
        link.href = album.link;
        link.target = '_blank';
        root.appendChild(link);
      }
      root.appendChild(CreateAlbum(artist, album, index));
    }

    return root;
  }
}

function CreatePage_music_artists_solo() {
  return {
    node: createArtist('solo')
  };
}

function CreatePage_music_artists_cam_jervis_experience() {
  return {
    node: createArtist('cam_jervis_experience')
  };
}

function CreatePage_music_artists_the_orfs() {
  return {
    node: createArtist('the_orfs')
  };
}

function CreatePage_music_equipment() {
  var box_objects = [];
  for(var i = 0; i < data.equipment.length; i++) {
    var equipment = data.equipment[i];

    box_objects.push({
      id: equipment.id,
      title: equipment.name,
      path: 'music/equipment/' + equipment.id,
      imgSrc: '/data/images/equipment/' + equipment.name + '/main.jpg'
    });
  }

  var node = document.createElement('div');
  node.className = 'equipment Page';

  node.appendChild(CreateBoxView(box_objects, GotoEquipment));

  return {
    node: node
  };

  function GotoEquipment(id) {
    page_handler.gotoPage(id.path);
  }
}

function createSubEquipment(id) {
  var equipment = null;
  for (var i = 0; i < data.equipment.length; i++) {
    if (data.equipment[i].name == id) {
      equipment = data.equipment[i].equipment;
      break;
    }
  }

  var box_objects = [];
  for (var i = 0; i < equipment.length; i++) {
    var guitar = equipment[i];
    box_objects.push({
      title: guitar.name,
      imgSrc: '/data/images/equipment/' + id + '/' + guitar.name + '.jpg'
    });
  }

  var node = document.createElement('div');
  node.className = 'equipment Page same_height';
  node.appendChild(CreateStream(box_objects));

  return node;
}

function CreatePage_music_equipment_guitars() {
  var node = createSubEquipment('Guitars');
  node.className += ' guitars';
  return {
    node: node
  };
}

function CreatePage_music_equipment_pedals() {
  var node = createSubEquipment('Guitar Pedals');
  node.className += ' pedals';
  return {
    node: node
  };
}

function CreatePage_music_equipment_amps() {
  return {
    node: createSubEquipment('Guitar Amplifiers')
  };
}

function CreatePage_music_equipment_keyboards() {
  return {
    node: createSubEquipment('Keyboards')
  };
}

function CreatePage_music_equipment_mixers() {
  return {
    node: createSubEquipment('Mixing Boards')
  };
}

function CreatePage_music_equipment_microphones() {
  return {
    node: createSubEquipment('Microphones')
  };
}

function CreatePage_software_personal() {
  var projects_node = document.createElement('div');
  projects_node.className = 'softwareProjects Page';

  var projects = [];
  for(var i = 0; i < data.softwareProjects.length; i++) {
    var project = data.softwareProjects[i];

    var project = {
      path: 'https://github.com/deadheadrussell/' + escape(project.repository_name),
      repo: project.repository_name,
      content: project.content,
      contentType: project.contentType
    };

    projects.push(project);
  }

  projects_node.appendChild(CreateStream(projects));

  return {
    node: projects_node
  };
}

function CreatePage_software_school() {
  var school_node = document.createElement('div');
  school_node.className = 'softwareProjects Page';

  var projects = [];
  for (var i = 0; i < data.schoolProjects.length; i++) {
    var project = data.schoolProjects[i];

    projects.push({
      title: project.name,
      subtitle: project.course,
      text: project.description,
      contentType: project.contentType
    });

  }

  school_node.appendChild(CreateStream(projects));

  return {
    node: school_node
  };
}

function CreatePage_software_work() {
  var work_node = document.createElement('div');
  work_node.className = 'softwareProjects Page';
  
  var projects = [];
  for (var i = 0; i < data.workProjects.length; i++) {
    var project = data.workProjects[i];

    projects.push({
      title: project.name,
      subtitle: project.company,
      text: project.description,
      contentType: project.contentType
    });
  }

  work_node.appendChild(CreateStream(projects));

  return {
    node: work_node
  };
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
          resume_node.innerHTML = e.target.responseText;
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


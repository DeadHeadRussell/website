(function() {
var pages = window.ajrussell.require('pages');
var widgets = window.ajrussell.require('widgets');

var page_id = 'Home';
var pages_handler = pages.getPagesHandler();
pages_handler.registerPage(page_id, createHomePage, true);

function createHomePage(data) {
  var content = document.createElement('div');
  content.className = page_id;
  
  content.appendChild(createWelcome(data));
  content.appendChild(createLinks(data));
  content.appendChild(createPlug(data));

  return content;
}

function createWelcome(data) {
  var head = document.createElement('div');
  head.className = 'head';

  var h1 = document.createElement('H1');
  h1.appendChild(document.createTextNode('Welcome.'));
  head.appendChild(h1);

  var intro = document.createElement('div');
  intro.appendChild(document.createTextNode(data.intro));
  head.appendChild(intro);

  return head;
}

function createLinks(data) {
  var elements = [
    {id: 'Music', title: 'Music', path: '/Music', imageSource: '/img/music/main.jpg'},
    {id: 'Software', title: 'Software', path: '/Soft', imageSource: '/img/software/main.jpg'},
    {id: 'Resumes', title: 'Resumes', path: '/Resumes', imageSource: '/img/resumes/main.jpg'}
  ];

  return widgets.createBoxView(elements, onClick);

  function onClick(element) {
    pages_handler.gotoPage(element.id);
    return true;
  }
}

function createPlug(data) {
  var random_index = Math.floor(Math.random() * data.sites.length);
  var plug = data.sites[random_index];

  var plug_node = createPlugNode(plug);

  var plugList = [{
    id: plug.name,
    node: plug_node
  }];

  var plug = widgets.createList('Random Plug', plugList);
  plug.className += ' sites';
  return plug;
}

function createPlugNode(plug) {
  var plug_node = document.createElement('div');

  var title_node = document.createElement('div');

  var link_node = document.createElement('a');
  link_node.appendChild(document.createTextNode(plug.name));
  link_node.href = plug.link;
  link_node.setAttribute('target', '_blank');
  title_node.appendChild(link_node);

  plug_node.appendChild(title_node);

  var description_node = document.createElement('div');
  description_node.appendChild(document.createTextNode(plug.description));
  plug_node.appendChild(description_node);

  return plug_node;
}

})();


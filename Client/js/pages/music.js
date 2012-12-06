(function() {
var html = window.ajrussell.require('html');
var pages = window.ajrussell.require('pages');
var widgets = window.ajrussell.require('widgets');

var pages_handler = pages.getPagesHandler();

pages_handler.aliasPage('Music', 'Music/Artists', true);
pages_handler.registerPage('Music/Artists', createArtistsPage);
pages_handler.registerPage('Music/Equipment', createEquipmentPage);

function createAlbumNode(album) {
  return document.createElement('div');
}

function createArtistNode(artist, image_source) {
  var content_node = document.createElement('div');
  content_node.className = 'artist';
  content_node.appendChild(html.createImageElement(image_source));
  content_node.appendChild(html.createTextElement(artist.description));

  for (var i = 0; i < artist.albums.length; i++) {
    var album = artist.albums[i];
    var album_node = createAlbumNode(album);
    content_node.appendChild(album_node);
  }
  
  var artist_node = document.createElement('div');
  artist_node.appendChild(widgets.createPageTitle(artist.name));
  artist_node.appendChild(content_node);
  artist_node.appendChild(widgets.createBackNode('/music/artists'));
  return artist_node;
}

function createArtistsPage(data, sub_pages) {
  var current_artists = [];
  var previous_artists = [];

  for (var i = 0; i < data.artists.length; i++) {
    var artist = data.artists[i];
    var image_source = '/img/music/' + artist.name + '/main.jpg';
    var artist_node = createArtistNode(artist, image_source);
    
    var box_object = {
      id: artist.name,
      title: artist.name,
      path: '/music/artists/' + artist.name,
      imageSource: image_source,
      content: artist_node
    };

    if(artist.end) {
      previous_artists.push(box_object);
    } else {
      current_artists.push(box_object);
    }
  }

  var artists_node = document.createElement('Div');
  artists_node.className = 'artists';
  var artists_content = document.createElement('Div');
  artists_node.appendChild(artists_content);

  return artists_node;
}

function createEquipmentPage(data, sub_pages) {
}

})();
/*
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
                    title.className = 'title';
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
                var node = document.createElement('Div');

                var obj = {id: id, node: node, text: song.name, desc: song.description, callback: dispDesc};

                if(song.recording) {
                    var img = document.createElement('Div');
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

                var span = document.createElement('Span');
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
        }

        var sectionNode = document.createElement('Div');
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

            var backNode = document.createElement('A');
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

            var content = document.createElement('Div');
            content.appendChild(img);

            var largeImage = document.createElement('Div');
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

        var backNode = document.createElement('A');
        backNode.href = '/music/equipment';
        backNode.className = 'back';
        backNode.addEventListener('click', function(e) { return preventDefaultLink(e); }, false);
        backNode.addEventListener('click', displayEquipmentList, false);
        backNode.addEventListener('keydown', keyToClick(displayEquipmentList), false);
        backNode.setAttribute('role', 'button');
        backNode.setAttribute('tabindex', '0');
        backNode.setAttribute('title', 'Back');

        var content = CreateBoxView(tiles, displayEquipmentImage);

        var sectionNode = document.createElement('Div');
        sectionNode.className = 'equipmentSection';
        sectionNode.appendChild(CreatePageTitle(e.name));
        sectionNode.appendChild(backNode);
        sectionNode.appendChild(content);

        equipment.content = sectionNode;
        equipment.tiles = tiles;
        equipments.push(equipment);
    }

    var artistsListNode = document.createElement('Div');
    var currentArtistsNode  = CreateSubSection('Current Acts', '', CreateBoxView(currentArtists, displayArtist));
    var previousArtistsNode = CreateSubSection('Previous Acts', '', CreateBoxView(previousArtists, displayArtist));
    artistsListNode.appendChild(CreatePageTitle('Related Acts'));
    artistsListNode.appendChild(currentArtistsNode);
    artistsListNode.appendChild(previousArtistsNode);
    artistsContent.appendChild(artistsListNode);

    var equipmentNode = document.createElement('Div');
    equipmentNode.className = 'equipment';
    equipmentContent = document.createElement('Div');
    equipmentNode.appendChild(equipmentContent);

    var equipmentListNode = document.createElement('Div');
    var equipmentBoxView = CreateBoxView(equipments, displayEquipment);
    equipmentListNode.appendChild(CreatePageTitle('Equipment'));
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

*/

var CreateBanner = function(title, subtitle) {
    var banner = document.createElement("Div");
    banner.className = 'Banner HeaderFont';

    var pageWidth = document.createElement("Div");
    pageWidth.className = 'PageWidth';

    var h1 = document.createElement("H1");
    h1.appendChild(document.createTextNode(title));
    pageWidth.appendChild(h1);

    var h2 = document.createElement('H2');
    h2.appendChild(document.createTextNode(subtitle));
    pageWidth.appendChild(h2);

    var div = document.createElement('Div');
    div.className = 'PlusOne';
    div.innerHTML = '<div class="g-plusone" data-href="http://ajrussell.ca"></div>';
    pageWidth.appendChild(div);

    banner.appendChild(pageWidth);

    return banner;
};

var CreatePageHead = function(title, sub) {
    var head = document.createElement('Div');
    head.className = 'Head HeaderFont';

    var h1 = document.createElement('H1');
    h1.appendChild(document.createTextNode(title));
    head.appendChild(h1);

    var intro = document.createElement('Div');
    intro.appendChild(document.createTextNode(sub));
    head.appendChild(intro);

    return head;
}

var CreateImageNav = function(title, id, src) {
    return { type: 'image', title: title, id: id, src: src };
};

var CreateHeaderNav = function(title) {
    return { type: 'header', title: title };
};

var CreateNav = function(title, id) {
    return { type: 'normal', title: title, id: id };
};

var CreateSubNav = function(title, id) {
    return { type: 'sub', title: title, id: id };
}

var CreateNavigation = (function() {
    return function(selections, init, callback) {
        var nav = document.createElement("Div");
        nav.className = 'Navigation';

        var current = null;
        var map = {};

        for(var i = 0; i < selections.length; i++) {
            var selection = selections[i];

            map[selection.id] = selection;

            var sub;
            switch (selection.type) {
                case 'image':
                    sub = createImageSelection(selection.title, selection.id, selection.src);
                    break;
                case 'header':
                    sub = createHeaderSelection(selection.title);
                    break;
                case 'normal':
                    sub = createSelection(selection.title, selection.id);
                    break;
                case 'sub':
                    sub = createSubSelection(selection.title, selection.id);
                    break;
            }
            selection.titleNode = sub;

            var pageWrapper = document.createElement("Div");
            pageWrapper.appendChild(selection.titleNode);
            selection.node = pageWrapper;

            nav.appendChild(sub);
        }

        var obj = {
            node: nav,
            select: function(id, no_state) {
                var selection = map[id];
              
                if (current == id) {
                   return;
                }

                map[id].titleNode.classList.add('Selected');

                if (current) {
                  map[current].titleNode.classList.remove('Selected');
                }

                current = id;
                callback(id, no_state);
            }
        }

        obj.select(init);

        return obj;

        function changePage(e) {
            var id = e.currentTarget.id;
            obj.select(id);
        }

        function createImageSelection(title, id, src) {
            var sub = createSelectionBase(id)
            sub.className += ' Image HeaderFont';

            var img = document.createElement('img');
            img.src = src;
            img.alt = '';

            sub.appendChild(img);
            sub.appendChild(document.createTextNode(title));

            return sub;
        }

        function createHeaderSelection(title) {
            var sub = document.createElement('span');
            sub.className += 'Pages Header HeaderFont';
            sub.appendChild(document.createTextNode(title));
            return sub;
        }

        function createSelection(title, id) {
            var sub = createSelectionBase(id);
            sub.appendChild(document.createTextNode(title));
            return sub;
        }

        function createSubSelection(title, id) {
            var sub = createSelectionBase(id);
            sub.className += ' Sub';
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(title));
            sub.appendChild(li);
            return sub;
        }

        function createSelectionBase(id) {
            var sub = document.createElement("a");
            sub.className = "Pages NoStyle ButtonLink";
            sub.href = '/' + escape(id);
            sub.id = id;

            sub.addEventListener('click', changePage, false);
            sub.addEventListener('click', function(e) { return preventDefaultLink(e); }, false);
            sub.addEventListener('keydown', keyToClick(changePage), false);

            return sub;
        }
    };
})();

var CreatePageTitle = function(title) {
    var node = document.createElement("Div");
    node.className = "PageTitle";
    node.appendChild(document.createTextNode(title));
    return node;
};

var CreateList = function(title, items, callback) {
    var node = document.createElement("Div");
    node.className = 'List';
    
    var titleNode = document.createElement("Div");
    titleNode.className = 'Title';
    titleNode.appendChild(document.createTextNode(title));
    node.appendChild(titleNode);

    for(var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemNode = document.createElement("Div");
        itemNode.id = item.id;
        itemNode.className = 'Item';
        if(item.node) {
            itemNode.appendChild(item.node);
        } else if(item.text) {
            itemNode.appendChild(document.createTextNode(item.text));
        }
        if(callback) {
            var eventHandler = function(obj) {
                return function(e) {
                    callback(obj);
                    return true;
                };
            }(item);
            var clickNode = itemNode.children[0];
            clickNode.setAttribute('tabindex', '0');
            clickNode.addEventListener('click', eventHandler, false);
            clickNode.addEventListener('keydown', keyToClick(eventHandler), false);

            if(item.callback) {
                var itemEventHandler = function(obj) {
                    return function(e) {
                        item.callback(obj);
                    };
                }(item);
                clickNode.addEventListener('mouseover', itemEventHandler, false);
                clickNode.addEventListener('focus', itemEventHandler, false);
            }
        }
        node.appendChild(itemNode);
    }

    return node;
};

var CreateSubSection = function(title, subtitle, content) {
    var node = document.createElement("Div");
    node.className = 'SubSection';

    var titleNode = document.createElement("Div");
    titleNode.className = 'Title';
    titleNode.appendChild(document.createTextNode(title));
    node.appendChild(titleNode);

    var subTitleNode;
    if(subtitle instanceof HTMLElement) {
        subTitleNode = subtitle;
    } else {
        subTitleNode = document.createElement("Div");
        subTitleNode.appendChild(document.createTextNode(subtitle));
    }
    subTitleNode.className = 'SubTitle';
    node.appendChild(subTitleNode);

    var contentNode = document.createElement("Div");
    contentNode.className = 'Content';
    contentNode.appendChild(content);
    node.appendChild(contentNode);

    return node;
};

function CreateBoxView(elems, callback) {
    var node = document.createElement("Div");
    node.className = "Boxes";

    for(var i = 0; i < elems.length; i++) {
        var elem = elems[i];

        var a = document.createElement("A");
        a.className = 'NoStyle';
        if (!callback) {
          a.className += ' NoLink';
        } else {
          a.href = escape(elem.path);

          var clickHandler = function(elem) {
              return function(e) {
                  goToPage(elem);
                  return true;
              }
          }(elem);

          a.addEventListener('click', function(e) { return preventDefaultLink(e); }, false);
          a.addEventListener('click', clickHandler, false);
          a.addEventListener('keydown', keyToClick(clickHandler), false);
        }

        var img = document.createElement('Img');
        img.src = elem.imgSrc;
        img.alt = '';
        img.setAttribute('border', '0');
        a.appendChild(img);

        var text = document.createElement('Div');
        text.appendChild(document.createTextNode(elem.title));
        a.appendChild(text);

        node.appendChild(a);
    }
    
    return node;

    function goToPage(elem) {
        callback(elem);
    }
}

function CreateGithubPost(elem) {
    var root = document.createElement('div');
    root.className = 'Post Clickable';

    var link = document.createElement('a');
    link.target = '_blank';
    link.href = elem.path;
    root.appendChild(link);

    github.getReadme('deadheadrussell/' + elem.repo, function(readme) {
      link.innerHTML = readme;
    });
 
    return root;
}

function CreatePost(elem) {
    var root = document.createElement('div');
    root.className = 'Post Text';

    var title = document.createElement('h1');
    title.innerText = elem.title;
    root.appendChild(title);

    var subtitle = document.createElement('h2');
    subtitle.innerText = elem.subtitle;
    root.appendChild(subtitle);

    var content = document.createElement('p');
    content.innerText = elem.text;
    root.appendChild(content);

    return root;
}

function CreateStream(elems, callback) {
    var root = document.createElement('div');
    root.className = 'Stream';

    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];

        var post = null;
        if (elem.contentType == 'github') {
            post = CreateGithubPost(elem);
        } else {
            post = CreatePost(elem);
        }
        root.appendChild(post);
    }

    return root;
}

function CreateAudioPlayer() {
    var node = document.createElement("Div");
    node.className = "AudioPlayer Audio";
    node.style.display = "none";

    var controlsDiv = document.createElement("Div");

    var controlText = document.createElement("Div");
    var title = document.createElement("Span");
    controlText.appendChild(title);
    controlsDiv.appendChild(controlText);
    
    function CreateNewAudio(src) {
        var audio = document.createElement("Audio");
        if(src) {
            if (audio.canPlayType('audio/ogg')) {
                audio.src = src + '.ogg';
            } else {
                audio.src = src + '.mp3';
            }
            audio.controls = true;
            audio.addEventListener('ended', songEnded, false);
            audio.addEventListener('error', songEnded, false);
            audio.addEventListener('playing', function() { songCallback(true); }, false);
            audio.addEventListener('pause', function() { songCallback(false); }, false);
        }
        return audio;
    }
    var audio = CreateNewAudio();
    controlsDiv.appendChild(audio);

    var prev = document.createElement("Div");
    prev.className = "Prev";
    prev.setAttribute('role', 'button');
    prev.setAttribute('tabindex', '0');
    controlsDiv.appendChild(prev);

    var next = document.createElement("Div");
    next.className = "Next";
    next.setAttribute('role', 'button');
    next.setAttribute('tabindex', '0');
    controlsDiv.appendChild(next);

    var currentlyPlaying = {};
    var forward = true;
    var error = 0;
    var displayUp = true;

    var controls = {
        toggleDisplay: function(on) {
            if(!on && on !== false) {
                on = !displayUp;
            }

            if(on) {
                if(transition.isUsingTransitions()) {
                    node.style[transition.getTransformStyle()] = 'translate(0px, 0px)';
                } else {
                    node.style.bottom = '0px';
                }
            } else {
                var height = controlsDiv.offsetHeight;
                if(transition.isUsingTransitions()) {
                    node.style[transition.getTransformStyle()] = 'translate(0px, ' + height + 'px)';
                } else {
                    node.style.bottom = -height + 'px';
                }
            }
            displayUp = on;
        },
        play: function(id) {
            if(id && id != currentlyPlaying.id) {
                songCallback(false);
                setCurrentlyPlaying(id);
                var url = currentlyPlaying.artist.name + '/' +
                          currentlyPlaying.album.name + '/' +
                          currentlyPlaying.song.name;
                controlsDiv.removeChild(audio);
                audio = CreateNewAudio('/data/audio/' + escape(url));
                controlsDiv.appendChild(audio);
                audio.play();
            } else if(audio.paused) {
                audio.play();
            } else {
                return;
            }
            node.style.display = '';
        },
        playNext: function() {
            forward = true;
            var ids = currentlyPlaying.id.split('/');

            var artist = data.artists[ids[0]];
            var album = artist.albums[ids[1]];
            ids[2]++;
            while(ids[2] >= album.songs.length || !album.songs[ids[2]].recording) {
                ids[1]++;
                while(ids[1] >= artist.albums.length) {
                    ids[0] = (ids[0] + 1) % data.artists.length;
                    artist = data.artists[ids[0]];
                    ids[1] = 0;
                }
                album = artist.albums[ids[1]];
                ids[2] = 0;
            }
            controls.play(ids.join('/'));
            return true;
        },
        playPrev: function() {
            forward = false;
            var ids = currentlyPlaying.id.split('/');

            var artist = data.artists[ids[0]];
            var album = artist.albums[ids[1]];
            ids[2]--;
            while(ids[2] < 0 || !album.songs[ids[2]].recording) {
                ids[1]--;
                while(ids[1] < 0) {
                    ids[0] = (ids[0] + data.artists.length - 1) % data.artists.length;
                    artist = data.artists[ids[0]];
                    ids[1] = artist.albums.length - 1;
                }
                album = artist.albums[ids[1]];
                ids[2] = album.songs.length - 1;
            }
            controls.play(ids.join('/'));
            return true;
        },
        pause: function() {
            audio.pause();
        },
        toggle: function(id) {
            if(!controls.isPlaying(id)) {
                controls.play(id);
            } else {
                controls.pause();
            }
        },
        isPlaying: function(id) {
            if(id && id != currentlyPlaying.id) {
                return false;
            }
            return !audio.paused;
        },
        getNode: function() {
            return node;
        }
    };

    prev.addEventListener('click', changeSong, false);
    prev.addEventListener('keydown', keyToClick(changeSong), false);
    prev.setAttribute('title', 'Previous Track');
    next.addEventListener('click', changeSong, false);
    next.addEventListener('keydown', keyToClick(changeSong), false);
    next.setAttribute('title', 'Next Track');

    var span = document.createElement("Span");
    span.className = 'ButtonMain';
    span.appendChild(document.createTextNode("Audio Player"));
    span.setAttribute('role', 'button');
    span.setAttribute('tabindex', '0');

    node.appendChild(span);
    node.appendChild(controlsDiv);

    span.addEventListener('click', clickDisplay, false);
    span.addEventListener('keydown', keyToClick(clickDisplay), false);

    function clickDisplay(e) {
        controls.toggleDisplay();
        return true;
    }

    function changeSong(e) {
        if(e.target.className == 'Next') {
            controls.playNext();
        } else {
            controls.playPrev();
        }
        if(e.type == 'click') {
            e.target.blur();
        }
    }

    function songEnded(e) {
        if(forward || e.type == 'ended' || e.type == 'error') {
            if (e.type == 'error')
                error++;
            if (error == 5) {
                error = 0;
                return false;
            }
            controls.playNext();
        } else {
            controls.playPrev();
        }
        return true;
    }

    function songCallback(playing) {
        if(currentlyPlaying.song &&
           currentlyPlaying.song.callback) {
            currentlyPlaying.song.callback(playing);
        }
    }

    function setCurrentlyPlaying(id) {
        var ids = id.split('/');
        currentlyPlaying.artist = data.artists[ids[0]];
        currentlyPlaying.artistId = ids[0];
        currentlyPlaying.album = currentlyPlaying.artist.albums[ids[1]];
        currentlyPlaying.albumId = ids[1];
        currentlyPlaying.song = currentlyPlaying.album.songs[ids[2]];
        currentlyPlaying.songId = ids[2];
        currentlyPlaying.id = id;

        title.innerHTML = '';

        var artistDiv = document.createElement("Div");
        artistDiv.appendChild(document.createTextNode(currentlyPlaying.artist.name));
        artistDiv.className = 'Artist';
        title.appendChild(artistDiv);

        var albumDiv = document.createElement("Div");
        albumDiv.appendChild(document.createTextNode(currentlyPlaying.album.name));
        albumDiv.className = 'Album';
        title.appendChild(albumDiv);

        var songDiv = document.createElement("Div");
        songDiv.appendChild(document.createTextNode(currentlyPlaying.song.name));
        songDiv.className = 'Song';
        title.appendChild(songDiv);
    }

    return controls;
}

function preventDefaultLink(e) {
    if(window.history && window.history.pushState) {
        e.preventDefault();
        return false;
    }
    return true;
}

function keyToClick(clickHandler, keys) {
    if(!keys) {
        keys = [13, 32];
    }
    return function(e) {
        if(keys.indexOf(e.keyCode) >= 0) {
            e.stopPropagation();
            e.preventDefault();
            return clickHandler(e);
        }
    };
}


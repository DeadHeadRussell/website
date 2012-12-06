(function() {

window.ajrussell.register('html', {
  createImageElement: createImageElement,
  createTextElement: createTextElement
});

function createImageElement(source) {
  var img = document.createElement('img');
  img.src = source;
  img.alt = '';
  return img;
}

function createTextElement(text) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div;
}

})();


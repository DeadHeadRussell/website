(function() {

var d = document.createElement("Div");
var browserPrefix = 'Transition' in d.style ? '' :
  'webkitTransition' in d.style ? 'webkit' :
  'MozTransition' in d.style ? 'Moz' :
  'oTransition' in d.style ? 'o' :
  'MSTransition' in d.style ? 'MS' :
  'Old';
d = undefined;

var transitionStyle = browserPrefix + "Transition";
var transitionEndEvent = browserPrefix + "TransitionEnd";
var transformStyle = browserPrefix + "Transform";

if (browserPrefix == 'Moz') {
  transitionEndEvent = 'transitionend';
}

var useTransitions = true;
if (browserPrefix == "Old") {
  useTransitions = false;
}

var transitions = {
  slide: function(oldNode, newNode, callback, duration) {
    return transition(oldNode, newNode, { slide: true, duration: duration }, callback);
  },
  scale: function(oldNode, newNode, callback, duration) {
    return transition(oldNode, newNode, { scale: true, fade: true, duration:  duration}, callback);
  },
  fade: function(oldNode, newNode, callback, duration) {
    return transition(oldNode, newNode, { fade: true, duration:  duration }, callback);
  },
  getTransitionEndEvent: function() {
    return transitionEndEvent;
  },
  getTransitionStyle: function() {
    return transitionStyle;
  },
  getTransformStyle: function() {
    return transformStyle;
  },
  isUsingTransitions: function() {
    return useTransitions;
  },

  // Callback status codes
  STARTING: 0,
  SUCCESS: 1,
  FAILED: 2
};

window.ajrussell.register('transitions', transitions);

var inTransition = false;
var next = null;
function transition(oldNode, newNode, options, callback_function) {
  var node = oldNode.parentNode;

  if(newNode === node || !node || !newNode ||
      !(window.history && window.history.pushState)) {
    callback(transitions.FAILED);
    return;
  }

  if(inTransition) {
    if(next) {
      callback(transitions.FAILED);
    } else {
      next = {node: node, newNode: newNode, options: options, callback: callback};
    }
    return;
  }

  if(oldNode === newNode) {
    callback(transitions.STARTING);
    callback(transitions.SUCCESS);
    return;
  }
  if(newNode.parentElement ||
      document.body.compareDocumentPosition(node) & 1) {
    callback(transitions.FAILED);
    return;
  }

  inTransition = true;
  callback(transitions.STARTING);

  if(useTransitions) {
    options = options || {};
    if(!(options.fade || options.scale || options.slide)) {
      options.fade = true;
    }
    var duration = options.duration || 500;
    duration = duration + 'ms';

    var width = node.offsetWidth;

    var transform = '';
    if(options.scale) {
      transform += ' scale(1.5)';
    }
    if(options.slide) {
      transform += ' translateX(-' + width + 'px)';
    }
    newNode.style[transformStyle] = transform;

    if(options.fade) {
      newNode.style.opacity = '0';
    }
    newNode.style.position = 'absolute';
    newNode.style.top = '0px';
    node.appendChild(newNode);

    oldNode.style[transitionStyle] =
      newNode.style[transitionStyle] =
      "" + duration;

    if(options.slide || options.scale) {
      node.style.overflow = 'hidden';
    }
    
    setTimeout(
      function() {
        var height = Math.max(node.clientHeight, newNode.offsetHeight);
        node.style.height = height + 'px';
        newNode.addEventListener(transitionEndEvent, removeChild, false);
    
        if(options.fade) {
          oldNode.style.opacity = '0';
          newNode.style.opacity = '1';
        }

        var oldTransform = '';
        var newTransform = '';
        if(options.scale) {
          oldTransform += ' scale(0.5)';
          newTransform += ' scale(1)';
        }
        if(options.slide) {
          oldTransform += ' translateX(' + width + 'px)';
          newTransform += ' translateX(0px)';
        }
        oldNode.style[transformStyle] = oldTransform;
        newNode.style[transformStyle] = newTransform;
      },
      1
    );
  } else {
    node.replaceChild(newNode, oldNode);
    inTransition = false;
    callback(transitions.SUCCESS);
  }

  function removeChild() {
    newNode.removeEventListener(transitionEndEvent, removeChild, false);
    node.removeChild(oldNode);

    node.style.overflow = '';
    node.style.height = '';

    oldNode.style[transitionStyle] = '';
    oldNode.style.opacity = '';
    oldNode.style[transformStyle] = '';

    newNode.style[transitionStyle] = '';
    newNode.style.opacity = '';
    newNode.style[transformStyle] = '';
    newNode.style.position = '';
    newNode.style.top = '';

    inTransition = false;

    callback(transitions.SUCCESS);

    if(next) {
      setTimeout(
        function(next) {
          return function() {
            transition(next.node, next.newNode,
                   next.options, next.callback);
          }
        }(next),
        1
      );
      next = null;
    }
  }

  function callback(status) {
    if (typeof callback_function == 'function') {
      callback_function(status);
    }
  }
}

})();


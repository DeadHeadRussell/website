(function() {

var d = document.createElement("Div");
var browserPrefix = 'webkitTransition' in d.style ? 'webkit' :
                    'MozTransition' in d.style ? 'Moz' :
                    'oTransition' in d.style ? 'o' :
                    'MSTransition' in d.style ? 'MS' :
                    'Transition' in d.style ? '' :
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

window.transition = {
    slide: function(node, newPage, callback, duration) {
        return transition(node, newPage, { slide: true, duration: duration }, callback);
    },
    scale: function(node, newPage, callback, duration) {
        return transition(node, newPage, { scale: true, fade: true, duration:  duration}, callback);
    },
    fade: function(node, newPage, callback, duration) {
        return transition(node, newPage, { fade: true, duration:  duration }, callback);
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

var inTransition = false;
var next = null;
function transition(node, newPage, options, callback) {
    if(newPage === node || !node || !newPage ||
       !(window.history && window.history.pushState)) {
        callback(window.transition.FAILED);
        return;
    }

    if(inTransition) {
        if(next) {
            callback(window.transition.FAILED);
        } else {
            next = {node: node, newPage: newPage, options: options, callback: callback};
        }
        return;
    }

    var oldPage = node.firstChild;
    if(oldPage === newPage) {
        callback(window.transition.STARTING);
        callback(window.transition.SUCCESS);
        return;
    }
    if(newPage.parentElement ||
       document.body.compareDocumentPosition(node) & 1) {
        callback(window.transition.FAILED);
        return;
    }

    inTransition = true;
    callback(window.transition.STARTING);

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
        newPage.style[transformStyle] = transform;

        if(options.fade) {
            newPage.style.opacity = '0';
        }
        newPage.style.position = 'absolute';
        newPage.style.top = '0px';
        node.appendChild(newPage);

        oldPage.style[transitionStyle] =
            newPage.style[transitionStyle] =
            "" + duration;

        /*oldPage.style[transitionStyle + "Property"] =
            newPage.style[transitionStyle + "Property"] =
            "opacity," + transformStyle;*/

        if(options.slide || options.scale) {
            node.style.overflow = 'hidden';
        }
        
        setTimeout(
            function() {
                var height = Math.max(node.clientHeight, newPage.offsetHeight);
                node.style.height = height + 'px';
                newPage.addEventListener(transitionEndEvent, removeChild, false);
        
                if(options.fade) {
                    oldPage.style.opacity = '0';
                    newPage.style.opacity = '1';
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
                oldPage.style[transformStyle] = oldTransform;
                newPage.style[transformStyle] = newTransform;
            },
            1
        );
    } else {
        node.replaceChild(newPage, oldPage);
        inTransition = false;
        callback(window.transition.SUCCESS);
    }

    function removeChild() {
        newPage.removeEventListener(transitionEndEvent, removeChild, false);
        node.removeChild(oldPage);

        node.style.overflow = '';
        node.style.height = '';

        oldPage.style[transitionStyle] = '';
        oldPage.style.opacity = '';
        oldPage.style[transformStyle] = '';

        newPage.style[transitionStyle] = '';
        newPage.style.opacity = '';
        newPage.style[transformStyle] = '';
        newPage.style.position = '';
        newPage.style.top = '';

        inTransition = false;

        callback(window.transition.SUCCESS);

        if(next) {
            setTimeout(
                function(next) {
                    return function() {
                        transition(next.node, next.newPage,
                                   next.options, next.callback);
                    }
                }(next),
                1
            );
            next = null;
        }
    }
}

})();


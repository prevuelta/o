'use strict';

function o (selector) {

    if (!selector || typeof selector !== "string") {
        return;
    }

    let matches = selector.match(/#[\w|-]+|\.[\w|-]+|\[[\w|-]+|\w+/g);


    if (matches) {

        if (selector.substr(0,1) === '#' && matches.length === 1) {
            return document.getElementById(selector.slice(1));
        } else if (matches.length > 1 || selector.substr(0,1) === '.' || selector.substr(0,1) === '[') {
            return document.querySelectorAll(selector);
        } else {
            return document.getElementsByTagName(selector);
        }

    } else {
        return;
    }
}

o.addListenersToNodeList = function (nodeArray, callback, event) {
    [].slice.call(nodeArray).forEach((el) => {
        el.addEventListener(event ? event : 'click', callback);
    });
};


module.exports = o;
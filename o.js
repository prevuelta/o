'use strict';

function o (selector) {

    if (!selector || typeof selector !== "string") {
        return;
    }

    let matches = new RegExp(/#|\.|\[|[a-z]/).exec(selector);

    if (matches) {

        if (matches[0] === '#') {
            return document.getElementById(selector);
        }

        if (matches[0] === '.' || matches[0] === '[') {
            return document.querySelectorAll(selector);

        }

        // Match tag
        if (matches[0]) {
            return document.getElementByTagName(matches[0]);
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
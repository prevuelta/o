'use strict';

function o(selector) {
    if (!selector || typeof selector !== 'string') {
        return;
    }

    let matches = selector.match(/#[\w|-]+|\.[\w|-]+|\[[\w|-]+|\w+/g);

    if (matches) {
        if (selector.substr(0, 1) === '#' && matches.length === 1) {
            const el = document.getElementById(selector.slice(1));
            return [el];
        } else if (
            matches.length > 1 ||
            selector.substr(0, 1) === '.' ||
            selector.substr(0, 1) === '['
        ) {
            return document.querySelectorAll(selector);
        } else {
            return document.getElementsByTagName(selector);
        }
    } else {
        return [];
    }
}

o.one = function(selector) {
    return this.call(null, selector)[0];
};

o.hide = function(selector) {
    try {
        const node =
            selector instanceof HTMLElement ? selector : this.one(selector);
        node.setAttribute('hidden', 'hidden');
    } catch (e) {}
};

o.show = function(selector) {
    try {
        const node =
            selector instanceof HTMLElement ? selector : this.one(selector);
        node.removeAttribute('hidden');
    } catch (e) {}
};

o.addListenersToNodeList = function(selector, event, callback) {
    [].slice.call(this.call(null, selector)).forEach((el, i) => {
        el.addEventListener(event ? event : 'click', e => callback(e, i));
    });
};

module.exports = o;

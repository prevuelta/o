'use strict';

function o (selector) {
    if (!selector) {
        return;
    }
    if (!!~selector.indexOf('#')) {
        return document.getElementById(selector);
    }
}

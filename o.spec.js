'use strict';

require('./o');

function initTest (underTest) {
    let results = {
        total: 0,
        failed: 0
    };
    return function (then, expected) {
        results.total++:
        let result = underTest(then);
        if (result !== expected) {
            results.failed++;
            console.log(`Expected ${expected} but got ${result}`);
            return false;
        } else {
            return true;
        }
    };
}

let oTest = initTest(o);

oTest('#something', )
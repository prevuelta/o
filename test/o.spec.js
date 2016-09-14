'use strict';

let positiveTestResults = {
    total: 0,
    failed: 0
};

let negativeTestResults = {
    total: 0,
    failed: 0
};

// Dodge, don't do this at home.
Element.prototype.isNodeList = function() {return false;}
NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = function(){return true;}

let positiveTests = [
    ["#thing", document.getElementById('thing')],
    [".otherthing", document.querySelectorAll('.otherthing')],
    ["#thing.otherthing", document.querySelectorAll('.otherthing')],
    ["article", document.getElementsByTagName('article')],
];

// More to come
let negativeTests = [
    ["#thing", document.getElementById('#thing2')]
];

function initTest (underTest, results) {
    return function (then, expected) {
        results.total++;
        let result = underTest(then);
        console.log(expected, result, result.isNodeList());
        if (result.isNodeList() && expected.isNodeList()) {
            let hasFailingMatch = [].slice.call(result).find((r, i) => {
                return r != expected[i];
            });
            if (hasFailingMatch) {
                 return failTest(then, expected, result, results);
            } else {
                return true;
            }
        } else {
            if (result !== expected) {
                return failTest(then, expected, result, results);
            } else {
                return true;
            }
        }
    };
}

function failTest (then, expected, result, results) {
    results.failed++;
    console.log(`For ${then}, expected ${expected} but got ${result}`);
    return false;
}

let positiveTest = initTest(o, positiveTestResults);
let negativeTest = initTest(o, negativeTestResults);

positiveTests.forEach(test => positiveTest(test[0], test[1]));
negativeTests.forEach(test => negativeTest(test[0], test[1]));


document.write(`
    <h3>Positive tests</h3>
    Passed ${positiveTestResults.total - positiveTestResults.failed} out of ${positiveTests.length}
    <h3>Negative tests</h3>
    Passed ${negativeTestResults.total - negativeTestResults.failed} out of ${negativeTests.length}
`);
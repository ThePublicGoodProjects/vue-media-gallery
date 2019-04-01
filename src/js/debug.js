/* eslint-disable no-console */
let isEnabled = false;

// debugger with message
function log(msg) {
    if (isEnabled) {
        console.log(msg);
    }
}

module.exports = function (enable) {
    isEnabled = enable || false;

    return {
        log: log
    };
};

var fs = require('fs');

var BaseBrowser = require('./Base');
var util = require("util");
var helper = require("../helper");
var _ = require('lodash');

var PhantomJSBrowser = function () {
    BaseBrowser.apply(this, arguments);

    this._start = function (url) {
        var captureFile = this._tempDir + '/capture.js';
        var captureCode = '(new WebPage()).open("' + url + '");';
        fs.createWriteStream(captureFile).end(captureCode);
        this._execCommand(this._getCommand(), ['--proxy=127.0.0.1:8081', captureFile]);
    };
};
util.inherits(PhantomJSBrowser, BaseBrowser);
_.merge(PhantomJSBrowser.prototype, {
    name: 'PhantomJS',

    DEFAULT_CMD: {
        linux: 'phantomjs',
        darwin: '/usr/local/bin/phantomjs',
        win32: process.env.ProgramFiles + '\\PhantomJS\\phantomjs.exe'
    },
    ENV_CMD: 'PHANTOMJS_BIN'
});


// PUBLISH
module.exports = PhantomJSBrowser;

var HtmlReporter = require('protractor-beautiful-reporter');

var browserstack = require('browserstack-local');

//var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
exports.config = {
    framework: 'jasmine',
    specs: ['test.js'],
    'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',
    'capabilities': {
        'browserstack.user': 'inmdigitalfactor1',
        'browserstack.key': 'tmMeGU9nTyTKcdWpPxyY',
        'browserstack.chrome.enablePopups': true,
        'os': 'Windows',
        'os_version': '10',
        'browserName': 'Chrome',
        'browser_version': '80.0 beta',
        'resolution': '1024x768'
    },

    // Code to start browserstack local before start of test
    beforeLaunch: function () {
        console.log("Connecting local");
        return new Promise(function (resolve, reject) {
            exports.bs_local = new browserstack.Local();
            exports.bs_local.start({'key': exports.config.capabilities['browserstack.key']}, function (error) {
                if (error) return reject(error);
                console.log('Connected. Now testing...');

                resolve();
            });
        });
    },

    // Code to stop browserstack local after end of test
    afterLaunch: function () {
        return new Promise(function (resolve, reject) {
            exports.bs_local.stop(resolve);
        });
    },
    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/Reports/screenshots`:
        jasmine.getEnv().addReporter(
            new HtmlReporter({
                //new Jasmine2HtmlReporter({
                baseDirectory: 'reports/tmp',
                images: 'images',
                jsonsOutput: 'jsons'
            })
                .getJasmine2Reporter());
        // )
    }
}
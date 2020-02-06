var HtmlReporter = require('protractor-beautiful-reporter');
//var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
exports.config = {
    // your config here
    framework: 'jasmine', 
    seleniumAddress: 'http://localhost:4444/wd/hub', 
    specs: ['test.js'],
    capabilities: {
      browserName: 'firefox',
    },
    /*multiCapabilities: [{
      browserName: 'firefox'
    }, 
    {
      browserName: 'chrome'
    }],*/
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
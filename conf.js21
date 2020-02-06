var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    // your config here
    framework: 'jasmine', 
    seleniumAddress: 'http://localhost:4444/wd/hub', 
    capabilities: { 
    browserName: 'chrome', 
    }, 
    specs: ['test.js'],
    onPrepare: function() {
    // Add a screenshot reporter and store screenshots to `/Reports/screenshots`:
    jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'reports/screenshots',
            images: 'images'
         }).getJasmine2Reporter());
      }
   }
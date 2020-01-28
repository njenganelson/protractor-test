var testData = require('./customerName.json');

describe('Open Browser', function() {


    it('Navigate to XYZ Bank', function() {
      browser.get('http://www.way2automation.com/angularjs-protractor/banking');
      browser.driver.manage().window().maximize();
      
    });
    it('Login to Bank Manager Module',function(){
      expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');
      expect(element(by.buttonText('Home')).isPresent())
      expect(element(by.buttonText('Customer Login')).isPresent())
      expect(element(by.buttonText('Bank Manager Login')).isPresent())

      var bankManagerLogin = element(by.cssContainingText('.btn-lg','Bank Manager Login'));
      bankManagerLogin.click();
    });
    it('Add Customer',function(){
      element(by.cssContainingText('.tab','Add Customer')).click();
      element(by.model('fName')).sendKeys(testData.firstName);
      element(by.model('lName')).sendKeys(testData.secondName);
      element(by.model('postCd')).sendKeys(testData.postalCode);
      browser.sleep(2000)
      element(by.cssContainingText('.btn-default','Add Customer')).click();
      // Waits for an alert pops up.
      browser.sleep(2000)
      browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
      browser.switchTo().alert().getText().then(function (text) {
        console.log(text);
      });
      browser.switchTo().alert().accept();
      browser.waitForAngularEnabled(true);
    });
    it('Open Account',function(){
      element(by.buttonText('Open Account')).click();
      element(by.id('userSelect')).click();
      element(by.cssContainingText('option', testData.firstName + ' ' + testData.secondName)).click();
      element(by.id('currency')).click()
      element(by.cssContainingText('option','Pound')).click()
      browser.sleep(2000)
      element(by.buttonText('Process')).click()
      browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
      browser.switchTo().alert().getText().then(function (text) {
        console.log(text);
      });
      browser.sleep(2000)
      browser.switchTo().alert().accept();
      browser.waitForAngularEnabled(true);
    })
    it('Navigate to Customer Login',function(){
      element(by.buttonText('Home')).click()
      expect(element(by.buttonText('Customer Login')).isPresent())
      expect(element(by.buttonText('Bank Manager Login')).isPresent())
      element(by.buttonText('Customer Login')).click()
    })
    it('Select Customer',function(){
      element(by.id('userSelect')).click();
      element(by.cssContainingText('option', testData.firstName + ' ' + testData.secondName)).click();
      browser.sleep(2000)
      element(by.buttonText('Login')).click()
    })
    it('Verify Customer has logged in Successfully',function(){
      browser.sleep(2000)
      expect(element(by.buttonText('Logout')))
      expect(element(by.buttonText('Transactions')))
      expect(element(by.buttonText('Deposit')))
      expect(element(by.buttonText('Withdrawl')))
      browser.sleep(2000)
    })
    it('Confirm Intial Balance',function(){
      var intialBalance = element(by.xpath('//div/strong[2]')).getText()
      intialBalance.getText().then(function(text){
        console.log(text)
      })
      expect(intialBalance='0')
    })
    it('Deposit funds',function(){
      element(by.xpath('//button[@ng-click="deposit()"]')).click()
      expect(element(by.model('amount')))
      element(by.model('amount')).sendKeys('20000')
      element(by.cssContainingText('.btn-default','Deposit')).click()
      var depositMessage = element(by.xpath('//div/span[@ng-show="message"]'))
      browser.wait(protractor.ExpectedConditions.presenceOf((depositMessage)),5000);
      depositMessage.getText().then(function(text){
        console.log(text)
      })
    })
    it('Confirm Balance after Deposit',function(){
      var balance = element(by.xpath('//div/strong[2]')).getText()
      balance.getText().then(function(text){
        console.log(text)
      })
      expect(balance='20000')
    })
  });


var testData = require('./customerName.json');
const  rimraf = require('rimraf')


describe('Open Browser', function() {
//Clear all reports before starting new Tests
    rimraf('./reports/tmp/.', function () 
      { 
        console.log('All past reports cleared');
      });

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
      browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
      browser.switchTo().alert().getText().then(function (text) {
        expect(text).toMatch('Customer added successfully with customer id :6')
        //expect(text='Customer added successfully with customer id :6')
      //console.log(text);
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
        expect(text).toMatch('Account created successfully with account Number :1016')
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
      expect(element(by.buttonText('Logout')))
      expect(element(by.buttonText('Transactions')))
      expect(element(by.buttonText('Deposit')))
      expect(element(by.buttonText('Withdrawl')))
      browser.sleep(2000)
    })
    it('Confirm Intial Balance',function(){
      var intialBalance = element(by.xpath('//div/strong[2]')).getText()
      intialBalance.getText().then(function(text){
        expect(text).toMatch('')
      })
      expect(intialBalance='0')
    })
    it('Deposit funds',function(){
      element(by.xpath('//button[@ng-click="deposit()"]')).click()
      expect(element(by.model('amount')))
      element(by.model('amount')).sendKeys(testData.amountToDeposit)
      element(by.cssContainingText('.btn-default','Deposit')).click()
      var txnMessage = element(by.xpath('//div/span[@ng-show="message"]'))
      browser.wait(protractor.ExpectedConditions.presenceOf((txnMessage)),5000);
      txnMessage.getText().then(function(text){
        expect(text).toMatch('Deposit Successful')
      })
    })
    it('Confirm Balance after Deposit',function(){
      var balance = element(by.xpath('//div/strong[2]')).getText()
      balance.getText().then(function(text){
        expect(text).toMatch('20000')
      })
      expect(balance='20000')
    })
    it('Withdraw funds',function () {
        element(by.css('[ng-click="withdrawl()"]')).click()
        expect(element(by.css('[ng-model="amount"]')))
        element(by.css('[ng-model="amount"]')).sendKeys(testData.amountToWithdraw)
        element(by.buttonText('Withdraw')).click()
        var txnMessage = element(by.css('[ng-show="message"]'))
        browser.wait(protractor.ExpectedConditions.presenceOf((txnMessage)),5000);
        txnMessage.getText().then(function(text){
            expect(text).toMatch('Transaction Failed. You can not withdraw amount more than the balance.')
        })
        element(by.buttonText('Deposit')).click()
    })
    it('Succesful withdrawal',function () {
        element(by.buttonText('Withdrawl')).click()
        withdraw =(parseInt(testData.amountToDeposit)-100000)
        console.log(withdraw)
        element(by.css('input[type="number"')).sendKeys(withdraw)
        element(by.buttonText('Withdraw')).click()
        browser.sleep(2000)
        var txnMessage = element(by.css('[ng-show="message"]'))
        browser.wait(protractor.ExpectedConditions.presenceOf((txnMessage)),5000);
        txnMessage.getText().then(function(text){
            expect(text).toMatch('Transaction successful')
        })

    })
  });


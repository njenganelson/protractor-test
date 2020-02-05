require('cypress-xpath')

describe('Test XYZ bank Portal',function(){

    beforeEach(function() {
        cy.fixture('customerDetails').then((customerDetails)=>{
            this.customerDetails=customerDetails;
        })
    
    })
    it('Confirm User is navigated to Home Page',function(){
        cy.visit('http://www.way2automation.com/angularjs-protractor/banking')
        cy.get('.btn-lg')
        .should('contain','Customer Login')
        .should('contain','Bank Manager Login')
    })
    it('Login to Bank Manager',function(){
        cy.get('.btn-lg').contains('Bank Manager Login').click()
        expect(cy.get('.tab').contains('Add Customer'))
        expect(cy.get('.tab').contains('Open Account'))
        expect(cy.get('.tab').contains('Customers'))
    })
    it('Add Customer',function(){
        cy.get('.tab').contains('Add Customer').click()
        //Enter First Name
        cy.get('[placeholder="First Name"]')
            .type(this.customerDetails.firstName)
        //Enter Second Name
        cy.get('[placeholder="Last Name"]')
            .type(this.customerDetails.lastName)
        //Enter Postal Code
        cy.get('[placeholder="Post Code"]')
            .type(this.customerDetails.postalCode)
        cy.get('.btn-default').click()

    })
    it('Open Account',function(){
        cy.contains('Open Account').click()
        cy.get('#userSelect',{timeout:10000})
            .select(this.customerDetails.firstName+' '+this.customerDetails.lastName)
    })
    it('Select Currency',function () {
        cy.get('#currency',{timeout: 10000})
            .select(this.customerDetails.currency)
        cy.get('[type="submit"]').click()
    })
    it('View Customer',function () {
        cy.contains('Customers').click()
        cy.get('[ng-model="searchCustomer"]',{timeout: 10000}).type(this.customerDetails.firstName)
        //Assert Table content
    })
    it('Customer Login',function () {
        cy.get('[ng-click="home()"]').click()
        cy.get('[ng-click="customer()"]',{timeout:10000}).click()
        cy.get('[ng-model="custId"]',{timeout:10000})
            .select(this.customerDetails.firstName+' '+this.customerDetails.lastName)
        cy.get('[type="submit"]').click()
        cy.get('.ng-binding')
            .should('have.')
    })
})
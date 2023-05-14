/// <reference types="cypress" />

context('web-ui', () => {
  beforeEach(() => {
    cy.visit('https://www.belong.com.au')
  })

  it('2. Navigate to See nbn Plan icon in the home Page , click and navigate to check the address from the page', () => {

    cy.url().should('contain', 'https://www.belong.com.au') //Verify the current url is https://www.belong.com.au

    cy.get('ul.sc-5c9f904b-0.hZUPnn>li:nth-child(3) a') //Verify the 3rd anchor has text 'See nbn plans'
      .as('btnSeeNbnPlans')
      .should('have.text', 'See nbn plans')

    cy.get('@btnSeeNbnPlans').click() // Click the 'See nbn plans' button 

    cy.url().should('contain', '/go/internet') //Verify the current url contains /go/internet

    cy.get('input[data-testid="address-lookup__input"]') // Enter the address and verify the address
      .type('1 Vedanta')
      .should('have.value', '1 Vedanta')

    cy.get('#queryList li:nth-child(1)') // Select the auto populated 1st address
      .click()

    cy.get('address[data-testid="address-summary-summary"]') // Verify the address
      .should('contain', 'Vedanta')

    cy.get('button[data-testid="step-address-lookup__submit-button"]') //Verify the button has Check address text
      .as('btnCheckAddress')
      .contains('Check address')

    cy.get('@btnCheckAddress').click() // Click the 'Check address' button

  })

})
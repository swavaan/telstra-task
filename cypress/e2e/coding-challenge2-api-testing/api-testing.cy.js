/// <reference types="cypress" />

context('api-testing', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com/api_list')
  })

  it('Exercise 1 API 1: Get All Products List', () => {
    cy.request('/api/productsList')
      .then((response) => {

        expect(response.status).to.equal(200) // Verify the response status has 200 OK 

        var responseBody = JSON.parse(response.body)
        console.log(responseBody)

        expect(responseBody).to.have.property('products') // Verify the 'products' property exist in the response body
        expect(responseBody.products[0].name).to.equal("Blue Top") // Verify the first element of products array attibute 'name' has value 'Blur Top'
      })
  })

  it('API 11: POST To Create/Register User Account', () => {

    const random = () => Cypress._.random(0, 1e6)
    const randomNumber = random()

    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: { // payload
        name: 'name',
        email: `email${randomNumber}@gamil.com`,
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname',
        address1: 'address1',
        country: 'country',
        state: 'state',
        city: 'city',
        zipcode: 'zipcode',
        mobile_number: 'mobile_number'
      },
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => {
        expect(response.status).to.equal(200) // Verify the response status has 200 OK 

        var responseBody = JSON.parse(response.body);
        console.log(responseBody)
        
        expect(responseBody).to.have.property('responseCode') // Verify the 'responseCode' property exist in the response body
        expect(responseBody.responseCode).to.equal(201) // Verify the 'responseCode' property has value '201'

        expect(responseBody).to.have.property('message')  // Verify the 'message' property exist in the response body
        expect(responseBody.message).to.equal('User created!') // Verify the 'message' property has value 'User created!'
      })
  })
})
/// <reference types="cypress" />
var faker = require("faker");

describe("Actions", () => {
  let uiData;
  let username;
  let email;

  beforeEach(function () {
    cy.fixture("uiTestConfig").then((data) => {
      uiData = data;
      return uiData;
    });
  });

  it("To verify that user is able to perform registration flow", () => {
    const randomString = Math.random().toString(36).substr(2, 5);
    username = "user" + randomString;
    const email = faker.internet.email();
    cy.visit(uiData.baseURL);
    cy.contains("Sign up").click();
    // We can use page object model for selector by adding pageObject folder in framework but its not recommnended
    cy.get("[type='text']").type(username);
    cy.get("[type='email']").type(email);
    cy.get("[type='password']").type(randomString);
    cy.get("[type='submit']").click();
  });
});

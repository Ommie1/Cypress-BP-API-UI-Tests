var randomCountryName = require("random-country-name");
describe("API tests", () => {
  let apitData;
  beforeEach(function () {
    cy.fixture("apiTestConfig").then((data) => {
      apitData = data;
      return apitData;
    });
  });

  let getAccessToken;
  let countryName;

  it("Login API", () => {
    cy.request({
      method: "POST",
      url: apitData.baseURL + apitData.loginEndpoint,
      body: {
        user: {
          email: "umairhassan7860@gmail.com",
          password: "testing123",
        },
      },
    }).then((response) => {
      // Validate response code
      expect(response).property("status").to.equal(200);
      // Validate body
      expect(response.body.user.username).equal("test");
      expect(response.body.user.email).equal("umairhassan7860@gmail.com");
      expect(response.body.user.token).to.not.be.oneOf([null, ""]);
      getAccessToken = response.body.user.token;
    });
  });

  it("Post articles API", () => {
    countryName = randomCountryName.random();
    cy.request({
      method: "POST",
      url: apitData.baseURL + apitData.articleEndpoint,
      headers: {
        Authorization: `Token ${getAccessToken}`,
      },
      body: {
        article: {
          title: "Inflation in " + countryName,
          description: "Inflation",
          body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
          tagList: [],
        },
      },
    }).then((response) => {
      // Validate response code
      expect(response).property("status").to.equal(200);
      // Validate body
      expect(response.body.article.title).equal("Inflation in " + countryName);
      expect(response.body.article.body).to.not.be.oneOf([null, ""]);
    });
  });
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

import { faker } from '@faker-js/faker'
import { Product } from '../../models/products'
import { Category } from '../../models/Category'

const userUrl = `${Cypress.env("apiUrl")}/api/v1/users`;
const keycloakLogin = `${Cypress.env("keycloak_login")}`;
const keycloakAdminUrl = `${Cypress.env("keycloak_admin_url")}`;

Cypress.Commands.add("login", (username: string, password: string) => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("#submit").click();
});

Cypress.Commands.add("registerUser", (username: string, password: string, confirmPassword: string, email: string, firstName: string, lastName: string) => {
    cy.get('input[name="username"]').type(username).should('be.visible');
    cy.get('input[name="password"]').type(password).should('be.visible');
    cy.get('input[name="password-confirm"]').type(confirmPassword).should('be.visible');
    cy.get('input[name="email"]').type(email).should('be.visible');
    cy.get('input[name="firstName"]').type(firstName).should('be.visible');
    cy.get('input[name="lastName"]').type(lastName).should('be.visible');
    cy.get('form').submit();

    cy.url().should('include', '/');
    //cy.contains('Registration successful!').should('be.visible');
});

Cypress.Commands.add("database", (action: "find" | "reset", table: string, data = {}) => {
    const token = Cypress.env("keycloakAdminToken");

    if (action === "find") {
       return cy.request({
            method: "GET",
            form: true,
            url: `${keycloakAdminUrl}${Cypress.env("realm_name")}/users?username=${data?.username}`,
            headers: {
                'Content-Type': 'text/html',
                Authorization: `Bearer ${token}`
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            return response.body;
        });
    } else if (action === "reset") {
        return cy.request({
            method: "POST",
            url: `${keycloakAdminUrl}/reset`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
});

Cypress.Commands.add("seedDatabase", () => {
    const method = 'POST'
    cy.getKeycloakUserToken(
      Cypress.env('client_id'),
      Cypress.env('username'),
      Cypress.env('password'),
      Cypress.env('keycloak_login'),
      Cypress.env('client_secret'),
      method
    ).then((token) => {
        Cypress.env('keycloakUserToken', token)
        console.log(token)
        console.log('logging token from the first login test ', Cypress.env('keycloakToken'))
    })
/*
    const token = Cypress.env("keycloakUserToken");

    return cy.request({
        method: "POST",
        url: userUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(() => {
        const users = Array.from({ length: 10 }, () => ({
            username: faker.internet.username(),
            password: 'password',
            email: faker.internet.email(),
        }));

        const insertPromises = users.map(user =>
          cy.request({
              method: "POST",
              url: userUrl,
              body: user,
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
        );

        return Cypress.Promise.all(insertPromises);
    });*/

});

Cypress.Commands.add("getAccessToken", (username: string, password: string) => {
    const clientId = Cypress.env("client_id");
    const realmName = Cypress.env("realm_name");
    const tokenUrl = `${Cypress.env("apiUrl")}/realms/${realmName}/protocol/openid-connect/token`;

    return cy.request({
        method: "POST",
        url: tokenUrl,
        form: true,
        body: {
            client_id: clientId,
            grant_type: "password",
            username: username,
            password: password,
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body.access_token;
    });
});

Cypress.Commands.add("getKeycloakUserToken", (client_id: string, username: string, password: string, url: string, client_secret: string, method: string) => {
    return cy.request({
        method: method,
        url: url,
        form: true,
        body: {
            grant_type: "password",
            client_id: client_id,
            username: username,
            password: password,
            client_secret: client_secret
        }
    }).then((response) => {
       // expect(response.status).to.eq(200);
        console.log("response body from getKeycloakToken", response.body)
        return response.body.access_token;

    });
});

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
    return cy.get(`[data-cy="${selector}"]`, ...args);
});

Cypress.Commands.add('getByDataTestId', (selector, ...args) => {
    return cy.get(`[data-test-id="${selector}"]`, ...args);
});

Cypress.Commands.add("seedDb", () => {
    cy.fixture("products_admin.json").then((products) => {
        cy.request("POST", "http://localhost:8222/api/v1/products/create-product", { products });
    });
});

/*
Cypress.Commands.add("database", (action: string, table, data = {}) => {
    const url = `http://localhost:8222/test-api/${table}`;

    if (action === "find") {
        return cy.request("GET", `${url}/${data.id}`).then((response) => response.body);
    } else if (action === "reset") {
        return cy.request("POST", `${url}/reset`);
    }
});
*/
/*
Cypress.Commands.add("database", (action: "find" | "reset", table: string, data = {

}) => {
    const url = `http://localhost:8222/test-api/${table}`;
    const token = Cypress.env("keycloakToken");

    if (action === "find") {
        return cy.request({
            method: "GET",
            url: `${url}/${data.username}`, // Use username instead of id
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Check if the response is OK
            return response.body;
        });
    } else if (action === "reset") {
        return cy.request({
            method: "POST",
            url: `${url}/reset`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
});
*/
/*
Cypress.Commands.add("getAccessToken", (username: string, password: string) => {
    const url = "http://localhost:9098/realms/auction-realm/protocol/openid-connect/token";
    const body = new URLSearchParams({
        client_id: Cypress.env("client_id"),
       // client_secret: Cypress.env("client_secret"),
        username: username,
        password: password,
        grant_type: "password"
    }).toString();

    return cy.request({
        method: "POST",
        url: url,
        body: body,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body.access_token;
    });
});


*/

Cypress.Commands.add('seedProductsForUser', (usernameEnv, passwordEnv, fixtureFile) => {
    cy.getKeycloakUserToken(
      Cypress.env('client_id'),
      Cypress.env(usernameEnv),
      Cypress.env(passwordEnv),
      Cypress.env('keycloak_login'),
      Cypress.env('client_secret'),
      'POST'
    ).then((token) => {
        Cypress.env('keycloakUserToken', token);

        cy.fixture(fixtureFile).then((data) => {
            data.products.forEach((product) => {
                cy.request({
                    method: 'POST',
                    url: 'http://localhost:8222/api/v1/products/create-product',
                    body: product,
                    headers: {
                        Authorization: `Bearer ${Cypress.env('keycloakUserToken')}`
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                });
            });
        });
    });
});

Cypress.Commands.add('seedProducts', () => {
    cy.fixture('products').then((data) => {
        data.products.forEach((product: Product) => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:8222/api/v1/products/create-product',
                body: product,
                headers: {
                    Authorization: `Bearer ${Cypress.env('keycloakUserToken')}`
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
});

Cypress.Commands.add('seedCategories', () => {
    cy.fixture('categories').then((data) => {
        data.categories.forEach((category: Category) => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:8222/api/v1/categories/create-category',
                body: category,
                headers: {
                    Authorization: `Bearer ${Cypress.env('keycloakUserToken')}`
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
});

/*
Cypress.Commands.add('seedDatabase', () => {
    cy.exec('node cypress/scripts/seedDataUtils.ts').then((result) => {
        expect(result.code).to.eq(0);
    });
});

*/

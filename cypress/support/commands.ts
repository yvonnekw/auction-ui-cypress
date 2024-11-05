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

Cypress.Commands.add("login", (username: string, password: string) => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("#submit").click();
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

Cypress.Commands.add("database", (action: "find" | "reset", table: string, data = {

}) => {
    const url = `http://localhost:8222/test-api/${table}`;
    const token = Cypress.env("keycloakToken"); // Assuming you've set the token in an environment variable

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

// Cypress command to get an access token from Keycloak
Cypress.Commands.add("getAccessToken", (username: string, password: string) => {
    const url = "http://localhost:9098/realms/auction-realm/protocol/openid-connect/token";
    const body = new URLSearchParams({
        client_id: "your-client-id", // Replace with your client ID
        client_secret: "your-client-secret", // Replace with your client secret (if required)
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
        return response.body.access_token; // Return the access token
    });
});

Cypress.Commands.add('seedDatabase', () => {
    cy.exec('node scripts/seedDataUtils.ts').then((result) => {
        expect(result.code).to.eq(0);
    });
});


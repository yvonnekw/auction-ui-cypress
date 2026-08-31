/// <reference types="cypress" />
/*
declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(): Chainable<any>;
    }
}*/
declare namespace Cypress {
	interface Chainable<Subject = any> {
		seedProducts(): void

		//getKeycloakToken(client_id: any, username: any, password: any): string
		//getKeycloakUserToken(client_id: string, username: string, password: string): Cypress.Chainable<Subject>

		//registerUser(firstName: string, lastName: string, username: string, email: string, password: string): void
		registerUser(username: string, password: string, confirmPassword: string, email: string, firstName: string, lastName: string): void

		//getKeycloakUserToken(client_id: string, username: string, password: string, url: string): Cypress.Chainable<Subject>
		getKeycloakUserToken(client_id: string, username: string, password: string, url: string, client_secret: string, method: string): Cypress.Chainable<Subject>

		getByDataCy(selector: any, args?: any): Cypress.Chainable<JQuery<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>>

		getByDataTestId(selector: any, args?: any): Cypress.Chainable<JQuery<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>>

		seedDb(): void

		seedCategories(): void

		seedProductsForUser(usernameEnv: any, passwordEnv: any, fixtureFile: any): void
	}
}
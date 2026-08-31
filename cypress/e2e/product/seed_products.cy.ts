///<reference path="../../../node_modules/cypress/types/cypress.d.ts"/>
describe('Product Tests', () => {
	beforeEach(() => {
		cy.getKeycloakUserToken(
			Cypress.env('client_id'),
			Cypress.env('admin_username'),
			Cypress.env('admin_password'),
			Cypress.env('keycloak_login'),
			Cypress.env('client_secret'),
			'POST'
		).then((adminToken: string) => {
			Cypress.env('keycloakUserToken', adminToken);

			cy.seedCategories()
			const users = [
				{ usernameEnv: 'admin_username', passwordEnv: 'admin_password', fixture: 'products_admin.json' },
				{ usernameEnv: 'test_username', passwordEnv: 'test_password', fixture: 'products_test.json' },
				{ usernameEnv: 'sofia_username', passwordEnv: 'sofia_password', fixture: 'products_sofia.json' },
				{ usernameEnv: 'mel_username', passwordEnv: 'mel_password', fixture: 'products_mel.json' }
			];

			users.forEach((user) => {
				cy.seedProductsForUser(user.usernameEnv, user.passwordEnv, user.fixture);
			});
		});
	});


	it('should run actual product-related test', () => {
		// your assertions here

	});

});

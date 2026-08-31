describe('Product Tests', function() {
	beforeEach(() => {
		cy.getKeycloakUserToken(
			Cypress.env('client_id'),
			Cypress.env('admin_username'),
			Cypress.env('admin_password'),
			Cypress.env('keycloak_login'),
			Cypress.env('client_secret'),
			'POST'
		).then((token) => {

			Cypress.env('keycloakUserToken', token)
			console.log(token)
			console.log('logging token from the second login test ', Cypress.env('adminUserToken'))
		})
		cy.seedCategories()
		cy.seedProducts()

		cy.getKeycloakUserToken(
			Cypress.env('client_id'),
			Cypress.env('test_username'),
			Cypress.env('test_password'),
			Cypress.env('keycloak_login'),
			Cypress.env('client_secret'),
			'POST'
		).then((token) => {

			Cypress.env('keycloakUserToken', token)
			console.log(token)
			console.log('logging token from the second login test ', Cypress.env('sofiaUserToken'))
		})
		//cy.seedCategories()
		cy.seedProducts()
	})

	it('should display products', function() {
		cy.origin('http://localhost:4200', () => {
			cy.visit('/')
		cy.get('.product-item').should('have.length.greaterThan', 0)
		cy.get('.product-item').first().contains('iPhone 14 Pro')
		});
	})

	it.only('should have correct product details', function() {

		cy.visit('/register')
			cy.contains('iPhone 14 Pro').closest('iPhone 14 Pro').within(() => {
				cy.getByDataCy( "product-name")
				{
					cy.get('.price').should('contain', '999.99')
					cy.get('.description').should('contain', 'Latest Apple smartphone with A16 chip')
				}
			})
		});
	//});

})

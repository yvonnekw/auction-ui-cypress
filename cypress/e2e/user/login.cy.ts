describe('User Login', function() {
	it('should log in via Keycloak and store user login token', function() {
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
	})

	//Method for get
	describe.only('Logins in admin, store admin token and use it to retrieve user details', function() {
		const method = 'POST'

		it('get user details with user token', function() {
			cy.getKeycloakUserToken(
				Cypress.env('client_id'),
				Cypress.env('admin_username'),
				Cypress.env('admin_password'),
				Cypress.env('keycloak_login'),
				Cypress.env('client_secret'),
        method
			).then((token) => {

				Cypress.env('keycloakAdminToken', token)
				console.log(token)
				console.log('logging token from the second login test ', Cypress.env('keycloakAdminToken'))
			})
			/*
			cy.database('find', 'users', Cypress.env('username')).then((user) => {
				cy.login(user.username, 	Cypress.env('password')).then(() => {
					cy.location('pathname').should('eq', '/')
				})
			})*/
		})
	})

})



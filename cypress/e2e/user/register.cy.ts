import { faker } from '@faker-js/faker';

describe("User Registration", () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get(':nth-child(3) > .btn').click()
  });

  it("should register a new user successfully", () => {

    const username = faker.internet.username();
    const password = "pwd1";
    const confirmPassword = "pwd1";
    const email = faker.internet.email();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    cy.log(`Registering user: ${firstName} ${lastName}, Username: ${username}, Email: ${email}`);
    cy.registerUser(username, password, confirmPassword,  email, firstName, lastName);
  });
});

/*
describe('User Registration', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(':nth-child(3) > .btn').click()
  });

  it('should register a new user successfully', () => {
    cy.get('input[name="username"]').type('newuser');
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="password-confirm"]').type('password123');

    cy.get('form').submit();

    cy.url().should('include', '/welcome');
    cy.contains('Registration successful!').should('be.visible');
  });

  it('should show error message for duplicate username', () => {

    cy.get('input[name="username"]').type('existinguser');
    cy.get('input[name="email"]').type('existinguser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="password-confirm"]').type('password123');

    cy.get('form').submit();

    cy.contains('Username already exists').should('be.visible');
  });
});

*/
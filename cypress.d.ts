
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to log in a user.
         * @param username - The username for the login.
         * @param password - The password for the login.
         * @returns void
         */
        login(username: string, password: string): Chainable<void>;

        /**
         * Custom command to interact with the database.
         * @param action - The action to perform (e.g., "find", "reset").
         * @param table - The name of the database table (or service).
         * @param data - An optional object containing data for the action (e.g., id for find).
         * @returns The user object when finding a user, or nothing for reset.
         */
        database(action: "find", table: string, data: { id: number }): Chainable<any>;
        database(action: "reset", table: string): Chainable<void>;
        getAccessToken(username: string, password: string): Chainable<void>;

        task<S = unknown>(event: string, arg?: any, options?: Partial<Loggable & Timeoutable>): Chainable<S>

        seedDatabase(): void


    }
}

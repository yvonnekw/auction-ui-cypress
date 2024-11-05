import {User} from "../../../models/user";

describe("User Login", function () {
    beforeEach(() => {
        cy.seedDatabase();
    });

    it("should redirect to the home page after login", function () {
        cy.database("find", "users", {id: 1}).then((user: User) => {
            cy.login(user.username, "password").then(() => {
                cy.location("pathname").should("equal", "/");
            });
        });
    })
});

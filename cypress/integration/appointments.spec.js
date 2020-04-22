describe("Navigation", () => {
    beforeEach(() => {
        //adopted from mocha
        cy.request("GET", "/api/debug/reset");

        cy.visit("/");

        cy.contains("Monday");
    });

    xit("should book an interview", () => {
        //Clicks on the "Add" button in the second appointment note:cy.get() allows arguments that match the jQuery API
        //We need to use first because there are two Add buttons, we hide the second one because it is part of the last appointment, which we only want to display the header with the time.
        cy.get("[alt=Add]").first().click();

        //Enters their name
        cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
        //Chooses an interviewer
        cy.get("[alt='Sylvia Palmer']").click();

        //Clicks the save button
        //.contains has default assertions ie automatically retry and wait
        cy.contains("Save").click();

        //Sees the booked appointment
        cy.contains(".appointment__card--show", "Lydia Miller-Jones");
        cy.contains(".appointment__card--show", "Sylvia Palmer");
    });

    it("should edit an interview", () => {
        cy.get("[alt=Edit]").first().click({ force: true });

        cy.get("[data-testid=student-name-input]")
            .clear()
            .type("Lydia Miller-Jones");
        cy.get("[alt='Tori Malcolm']").click();

        cy.contains("Save").click();

        cy.contains(".appointment__card--show", "Lydia Miller-Jones");
        cy.contains(".appointment__card--show", "Tori Malcolm");
    });

    it("should cancel an interview", () => {
        cy.get("[alt=Delete]").click({ force: true });

        cy.contains("Confirm").click();

        cy.contains("Deleting").should("exist");
        cy.contains("Deleting").should("not.exist");

        cy.contains(".appointment__card--show", "Archie Cohen").should(
            "not.exist"
        );
    });
});

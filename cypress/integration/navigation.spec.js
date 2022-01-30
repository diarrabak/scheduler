describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("http://localhost:8000/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("http://localhost:8000/");
    cy.get("li").contains("Tuesday").click();

    cy.contains("li", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");

      it("should navigate to Tuesday", () => {
        cy.visit("http://localhost:8000/");
      
        cy.contains("[data-testid=day]", "Tuesday")
          .click()
          .should("have.class", "day-list__item--selected")
      });
      
  });
});

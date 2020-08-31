

describe('User Onboarding', () => {

    describe('Inputs, Simple Tests', () => {

        it('can navigate to localhost3000', () => {
            cy.visit('http://localhost:3000')
            cy.url().should('include', 'localhost')
        })

        it('getting name input', () => {
            cy.get('input[name="name"]')
            .type('Bob')
            .should('have.value', 'Bob')
        })

        it('getting email input', () => {
            cy.get('input[name="email"]')
            .type('johnsmith@gmail.com')
        })

        it('getting password input', () => {
            cy.get('input[name="password"]')
            .type('password123')
        })

        it('checking terms box', () => {
            cy.get('input[name="terms"]')
            .click()
        })

        it('submitting form data', () => {
            cy.get("#submitButton")
            .click()
        })
    })

    describe('Form Validation', () => {

        it('can navigate to localhost3000', () => {
            cy.visit('http://localhost:3000')
            cy.url().should('include', 'localhost')
        })

        it('getting name input', () => {
            cy.get('input[name="name"]')
            .type('Bob')
            .should('have.value', 'Bob')
        })

        it('trying to click submit', () => {
            cy.get("#submitButton")
            .click().should('be.disabled')
        })
    })
})
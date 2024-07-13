// import { expect } from 'chai'

describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/') // change URL to match your dev URL

        cy.viewport(1920, 1080)
    })

    it('finds download cv button', () => {
        cy.visit('/')

        cy.viewport(1920, 1080)

        cy.get('#li-download-btn')

        cy.viewport(1080, 1080)

        cy.get('#hamburger')
        cy.get('#li-download-btn')
    })
})
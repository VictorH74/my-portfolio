// import { expect } from 'chai'

// import Header from "@/components/Header"

describe('Header', () => {
    it('mounts', () => {
        // cy.mount(<Header/>)
    });
    it('finds nav links', () => {
        cy.viewport(1920, 1080);
        // cy.mount(<Header/>)
        cy.get('#li-');
        cy.get('#li-about-me');
        cy.get('#li-skills');
        cy.get('#li-projects');
        cy.get('#li-contact-me');
        cy.get('#li-contacts');
        cy.get('#li-download-btn');
    });
});

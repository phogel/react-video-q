describe('App', () => {
  describe('Card details page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/videos/Q1FWRhT4rTk')
    })

    it('has a youtube video embed', () => {
      //cy.find('div').should('have.class', 'ytp-cued-thumbnail-overlay')
      cy.get('iframe')
    })

    it('has title', () => {
      cy.contains('div', 'Title3')
    })

    it('has notes', () => {
      cy.contains('div', 'ipsum')
    })

    it('has three tags', () => {
      cy.get('section')
        .find('ul > li')
        .should('have.length', 3)
    })

    it('has buttons', () => {
      cy.get('section')
        .find('svg')
        .should('have.length', 4)
    })
  })
})

/* it('link can be clicked', () => {
      cy.get('section')
        .find('a')
        .find('div')
        .click()
        .location('pathname')
        .should('include', '/videos')
    })
    it('has the right path', () => {
      cy.location('pathname').should('include', '/videos') */

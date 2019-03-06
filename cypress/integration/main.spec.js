describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('has the correct title', () => {
    cy.title().should('equal', 'video-q')
  })

  describe('Card overview', () => {
    it('has links', () => {
      cy.get('section').find('a')
    })

    it('has cards', () => {
      cy.get('section')
        .find('a')
        .find('div')
    })

    it('has titles in cards', () => {
      cy.get('section')
        .find('a')
        .find('div')
        .find('h3')
    })

    it('has tags in cards', () => {
      cy.get('section')
        .find('a')
        .find('div')
        .find('ul')
    })
  })

  describe('Card details page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
      cy.get('section')
        .find('a')
        .find('div')
        .click()
    })

    it('has a title', () => {
      cy.get('section')
        .find('h3')
        .should('include', 'title')
    })

    it('has notes', () => {
      cy.get('section')
        .find('div')
        .should('include', 'ipsum')
    })

    it('has three tags', () => {
      cy.get('section')
        .find('ul > li')
        .should('have.length', 3)
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

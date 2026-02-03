describe('Home page loading UX', () => {
  it('affiche des skeletons pendant le fetch puis les livres stubbés', () => {
    // Stub recent changes endpoint (simulate slow response)
    cy.intercept(
        { method: 'GET', url: '**/recentchanges/add-book.json*' },
        (req) => {
          // simulate network delay then respond with fixture
          req.on('response', (res) => {});
        }
    ).as('recentRaw');

    // Provide fixture with a slight delay to allow skeletons to appear
    cy.intercept('GET', '**/recentchanges/add-book.json*', {
      statusCode: 200,
      delayMs: 600,
      fixture: 'recentChanges.json'
    }).as('recent');

    // When the app requests book details, return fixture
    cy.intercept('GET', '**/books/OL1M.json', {
      statusCode: 200,
      fixture: 'book-OL1M.json'
    }).as('bookDetail');

    // Visit home (dev server must be running at baseUrl)
    cy.visit('/');

    // While the network is delayed, skeleton elements (animate-pulse) should exist
    cy.get('.animate-pulse').should('exist');

    // wait for recentchanges and book detail to complete
    cy.wait('@recent');
    cy.wait('@bookDetail');

    // After responses complete, skeletons should be gone
    cy.get('.animate-pulse').should('not.exist');

    // Check that the stubbed book title is rendered somewhere on the page
    cy.contains('Recent Book').should('exist');
  });
});
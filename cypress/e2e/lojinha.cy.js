describe('Frontend da Lojinha - Testes E2E', () => {
  it('deve carregar a página e exibir o título Lojinha', () => {
    cy.visit('/');
    cy.contains('h1', 'Lojinha').should('be.visible');
  });

  it('deve consultar o backend real e exibir os três produtos com nomes e preços corretos', () => {
    cy.visit('/');

    // Verifica que existem três produtos na lista
    cy.get('#produtos li').should('have.length', 3);

    // Verifica os nomes e os preços apresentados
    cy.get('#produtos li').eq(0).should('have.text', 'Caderno: R$ 19,90');
    cy.get('#produtos li').eq(1).should('have.text', 'Caneta: R$ 4,50');
    cy.get('#produtos li').eq(2).should('have.text', 'Mochila: R$ 89,90');
  });

  it('deve exibir mensagem de falha quando a API estiver indisponível', () => {
    // Simula erro de conexão no endpoint de produtos
    cy.intercept('GET', 'http://localhost:3001/produtos', {
      forceNetworkError: true
    }).as('falhaProdutos');

    cy.visit('/');

    cy.wait('@falhaProdutos');
    cy.get('#mensagem')
      .should('be.visible')
      .and('have.class', 'erro')
      .and('contain', 'Não foi possível carregar os produtos.');

    cy.get('#produtos li').should('have.length', 0);
  });
});

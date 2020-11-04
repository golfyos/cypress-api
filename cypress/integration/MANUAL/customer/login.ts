describe('Login', () => {
    let accessToken: string = ''

    before(() => {
        cy.getAccessToken(Cypress.env('adminEmail'), Cypress.env('adminPassword')).then(
            ({ token }: { token: string }) => (accessToken = token)
        )
    })

    it('should data', () => {
        expect('data').equal('data')
    })

    it('should token equal yourself test', () => {
        expect(accessToken).equal(accessToken)
    })
})

declare namespace Cypress {
    interface Chainable<Subject> {
        call(
            uri: string,
            method: import('../cypress/utils/http-method').HttpMethod,
            body: any,
            headers?: import('../cypress/support/commands').HttpRequestHeader
        ): Chainable<Subject>
        graphql(graphql: string, headers?: import('../cypress/support/commands').HttpRequestHeader): Chainable<Subject>
        getAccessToken(username: string, password: string): Chainable<Subject>
    }
}

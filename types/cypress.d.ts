declare namespace Cypress {
    interface Chainable<Subject> {
        call(
            uri: string,
            method: import('../cypress/utils/http-method').HttpMethod,
            body: any,
            headers?: import('../cypress/support/commands').HttpRequestHeader
        ): void
        graphql(graphql: string, headers?: import('../cypress/support/commands').HttpRequestHeader): void
        getAccessToken(username: string, password: string): Chainable<Subject>
    }
}

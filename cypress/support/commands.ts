import { HttpMethod } from '../utils/http-method'
import { IncomingHttpHeaders } from 'http'

export interface HttpRequestHeader extends IncomingHttpHeaders {}

export enum UserType {
    ADMIN = 'admin',
    USER = 'user',
}

function combineURLs(baseURL: string, relativeURL: string) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

const defaultHeaders: HttpRequestHeader = {
    'content-type': 'application/json',
}

Cypress.Commands.add('call', (uri: string, method: HttpMethod, body: any, headers: HttpRequestHeader = {}) => {
    const baseUrl = Cypress.env('url')
    const normalizeUrl = combineURLs(baseUrl, uri)

    cy.request({
        url: normalizeUrl,
        method,
        body,
        headers: {
            ...defaultHeaders,
            headers,
        },
        encoding: 'utf-8',
    })
})

Cypress.Commands.add('graphql', (graphql: string, headers: HttpRequestHeader = {}) => {
    const baseUrl = Cypress.env('url')
    const normalizeUrl = combineURLs(baseUrl, '/')

    cy.request({
        url: normalizeUrl,
        method: HttpMethod.POST,
        body: {
            query: graphql,
        },
        headers: {
            ...defaultHeaders,
            headers,
        },
        encoding: 'utf-8',
    })
})

Cypress.Commands.add('getAccessToken', (username: string, password: string) => {
    return cy
        .request({
            url: Cypress.env('url'),
            headers: {
                ...defaultHeaders,
            },
            method: HttpMethod.POST,
            body: {
                query: `
                    query {
                        userLogin (
                            email: "${username}"
                            password: "${password}"
                        ) {
                            tokenType
                            accessToken
                            refreshToken
                            expiresIn
                        }
                    }
                `,
            },
        })
        .then((response: Cypress.Response) => {
            const tokenType = response.body?.data?.userLogin?.tokenType
            const accessToken = response.body?.data?.userLogin?.accessToken

            return {
                token: `${tokenType} ${accessToken}`,
            }
        })
})

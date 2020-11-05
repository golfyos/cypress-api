import { HttpRequestHeader } from '../../../support/commands'
import { getCustomer } from './util'

describe('Login', () => {
    let accessToken: string = ''

    before(() => {
        cy.getAccessToken(Cypress.env('adminEmail'), Cypress.env('adminPassword')).then(
            ({ token }: { token: string }) => {
                accessToken = token
            }
        )
    })

    it('should data', () => {
        expect('data').equal('data')
    })

    it('should token equal yourself test', () => {
        expect(accessToken).equal(accessToken)

        const gql = `
			query {
				products (
					lang:EN
				) {
					data {
						sku
						stock {
							price
						}
						name {
							en
						}
					}
				}
			}
		`

        const headers: HttpRequestHeader = {
            authorization: accessToken,
        }

        cy.graphql(gql, headers).then((response: Cypress.Response) => {
            expect(response.status).equal(200)

            const data = response.body.data
            expect(data).to.exist
        })
    })

    it('should get customer fail', () => {
        const gqlCustomer = getCustomer('1212312121ssoId')

        cy.graphql(gqlCustomer, { authorization: accessToken }).then((response: Cypress.Response) => {
            expect(response.status).not.equal(200)
        })
    })

    it('should get customer success', () => {
        const targetSsoId = '555666'
        const gqlCustomer = getCustomer(targetSsoId)

        cy.graphql(gqlCustomer, { authorization: accessToken }).then((response: Cypress.Response) => {
            expect(response.status).equal(200)

            const data = response.body.data

            expect(data.ssoId).equal(targetSsoId)
        })
    })
})

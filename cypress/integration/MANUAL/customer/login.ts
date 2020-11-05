import { HttpRequestHeader } from '../../../support/commands'
import { HttpMethod } from '../../../utils/http-method'

describe('Login', () => {
    let accessToken: string = ''

    before((done) => {
        cy.getAccessToken(Cypress.env('adminEmail'), Cypress.env('adminPassword')).then(
            ({ token }: { token: string }) => {
                accessToken = token
                done()
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

    it('should create product success', () => {
        const uri = '/product/upload/products'
        const body = {
            sku: '112112',
            name: {
                en: 'test-en',
                th: 'test-th',
                cn: 'test-cn',
            },
        }

        const headers: HttpRequestHeader = {
            authorization: accessToken,
        }

        cy.call(uri, HttpMethod.POST, body, headers).then((response: Cypress.Response) => {
            const data = response.body.data
            expect(data).to.exist
        })
    })
})

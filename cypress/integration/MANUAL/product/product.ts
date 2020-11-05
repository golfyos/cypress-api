import { HttpRequestHeader } from '../../../support/commands'
import { HttpMethod } from '../../../utils/http-method'

describe('Product', () => {
    let accessToken: string = ''

    before(() => {
        cy.getAccessToken(Cypress.env('adminEmail'), Cypress.env('adminPassword')).then(
            ({ token }: { token: string }) => {
                accessToken = token
            }
        )
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

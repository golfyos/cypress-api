export const getCustomer = (ssoId: string) => {
    return `
        query {
            customer(
                ssoId: "${ssoId}",
                type: ADMIN
            ) {
                ...on CustomerResponse {
                    ssoId
                    firstName
                    lastName
                }
            }
        }
    `
}

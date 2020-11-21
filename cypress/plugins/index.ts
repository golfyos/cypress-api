/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: any, config: Cypress.ConfigOptions) => {
    const env = config.env.environment
    const url = config.env.url

    if (env === 'integration') {
        config.baseUrl ??= url
    } else {
        config.baseUrl ??= `http://${env}-${url}`
    }

    return config
}

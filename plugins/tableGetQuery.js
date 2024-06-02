const fp = require('fastify-plugin')

async function tableGetQueryPlugin(fastify, options) {
    // plugin to get a table with table name = schema.$id
    fastify.decorate('tableGetQuery', (schema) => {
        
    let query = `
    SELECT *
    FROM
    public."${schema.$id}"
    `
    return query
    })
}

module.exports = fp(tableGetQueryPlugin, {
    // fastify: '4.x',
    name: 'tableGetQueryPlugin',
  });

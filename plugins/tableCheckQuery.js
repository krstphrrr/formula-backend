const fp = require('fastify-plugin')

async function tableCheckQueryPlugin(fastify, options) {
  // this plugin creates a query that check if a table with the name
  // schema.$id exists
    fastify.decorate('tableCheckQuery', (schema) => {
  
      let query = `SELECT EXISTS (
                    SELECT 1
                    FROM pg_tables
                    WHERE schemaname = 'public'
                    AND tablename = '${schema.$id}'
                  );`

      return query
    })
}

module.exports = fp(tableCheckQueryPlugin, {
    // fastify: '4.x',
    name: 'tableCheckQueryPlugin',
  });

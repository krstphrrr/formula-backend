const ingredientSchema = require("../schemas/ingredientSchema")
module.exports = async function (fastify, opts) {
    // fastify.get('/ingredient', async function (request, reply) {
    //   return 'this is an example'
    // })

    fastify.get('/ingredient', {
        schema: {query: ingredientSchema},
        handler: async (request, reply) => {
            // create table query
            let tblGet = fastify.tableGetQuery(ingredientSchema)
            //  check for table existence query
            let tblChk = fastify.tableCheckQuery(ingredientSchema)
            // database setup
            let pool = fastify.pg
            
            // table existence check
            let tbl = await pool.query(tblChk)
            let table
            [table] = tbl.rows

            
            // if table exists, get! if not, error out
            try{
                if(!table.exists){
                    
                    return reply.status(400).send({ error: 'table does not exist' });
                } else {
                    let {rows} = await pool.query(tblGet)
                    return rows
                }
            } catch(err) {
                reply.status(500).send({ error: err });
            }
        }
      }
    )
  }
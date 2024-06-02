const ingredientSchema = require("../schemas/ingredientSchema")
module.exports = async function (fastify, opts) {
    // fastify.get('/ingredient', async function (request, reply) {
    //   return 'this is an example'
    // })

    fastify.post('/ingredient', {
        schema: {query: ingredientSchema},
        handler: async (request, reply) => {
          // post query

          const{ingredientName, CAS, category, supplier, inventory, ifralimit, dateAcquired, DateLoadedInDb, description, strength, substantivity, recommendedMax, pyramidEstimate} = request.body
          // let DateLoadedInDb = new Date().toISOString()
          let tblPost = fastify.postQuery(ingredientSchema)
          // create table query
          let tblCreate = fastify.CreateQuery(ingredientSchema)
          //  check for table existence query
          let tblChk = fastify.tableCheckQuery(ingredientSchema)
          // database setup
          let pool = fastify.pg
          
          // table existence check
          let tbl = await pool.query(tblChk)
          let table
          [table] = tbl.rows

          // try{
            if(!table.exists){
                
                let crt = pool.query(tblCreate)
                crt.resolve()
                

                let {rows} = await pool.query({
                  text: tblPost, 
                  values: [ingredientName, CAS, category, supplier, inventory, ifralimit, dateAcquired, DateLoadedInDb, description, strength, substantivity, recommendedMax, pyramidEstimate]
                })
                
                reply.code(201)
                return {created: true}

            } else {
                

                let {rows} = await pool.query({
                  text: tblPost, 
                  values: [ingredientName, CAS, category, supplier, inventory, ifralimit, dateAcquired, DateLoadedInDb, description, strength, substantivity, recommendedMax, pyramidEstimate]
                })
                reply.code(201)
                return {created: true}
        }
        }
      }
    )
  }

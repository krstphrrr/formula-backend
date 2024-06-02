const fp = require('fastify-plugin')

async function CreateQueryPlugin(fastify, options) {
    
    fastify.decorate('CreateQuery', (schema) => {

    // 1.  bring schema keys
    let columns = Object.keys(schema.properties)
    let removed

    // 2. create column array 
    [removed]  = columns.filter(removeID)
    
    // let counter = columns.length
    query = `CREATE TABLE IF NOT EXISTS ${schema.$id} (`
    
    query += `${removed} SERIAL PRIMARY KEY NOT NULL, `

    // 3. interpolate column array inside query string

    
    for(let i in columns){

        if(i<(columns.length-1)){
            
            query += `"${columns[i]}" ${fastify.typeParse(schema, columns[i])}, `

        } else if (i==(columns.length-1)) {
            
            query += `"${columns[i]}" ${fastify.typeParse(schema, columns[i])} `
        }
        
    }
    query += ");"
    // 4. return query
    return query
    })
}

function removeID(value, index, arr){
    if (value === 'ingredientId'){
        arr.splice(index,1)
        return true
    }
    return false
}


function valueMap(reqBody){
    let valArray = []
    for(let i of Object.keys(reqBody)){
      let val = `"${reqBody[i]}"`
      valArray.push(val)
    }
    return valArray
  
  }
module.exports = fp(CreateQueryPlugin, {
    // fastify: '4.x',
    name: 'CreateQueryPlugin',
  });

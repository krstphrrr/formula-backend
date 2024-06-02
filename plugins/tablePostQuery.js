const fp = require('fastify-plugin')

async function PostQueryPlugin(fastify, options) {

    fastify.decorate('postQuery', (schema) => {
      // plugin to create an insert request 
      let columns = Object.keys(schema.properties)
      let removed  = columns.filter(removeID)


      let query = `
      INSERT INTO ${schema.$id}
      (${valueMap(columns).join(", ")})

      VALUES (${insertCount(Object.keys(columns)).join(", ")})
      RETURNING *;
       `
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


function insertCount(schemaKeys){
  let count = 1
  let retString = ""
  let valArray = []

  for (let i in schemaKeys){

    retString = `$${count}`
    valArray.push(retString)
    count +=1    
  }
  return valArray
}

function valueMap(reqBody){
  let valArray = []
  for(let i of Object.keys(reqBody)){
    let val = `"${reqBody[i]}"`
    valArray.push(val)
  }
  return valArray

}

module.exports = fp(PostQueryPlugin, {
    // fastify: '4.x',
    name: 'PostQueryPlugin',
  });

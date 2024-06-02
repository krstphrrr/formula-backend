const fp = require('fastify-plugin')

async function typeParsePlugin(fastify, options) {
    fastify.decorate('typeParse', (schema, column) => {
        // taking the entire schema object to check the properties
        let combo = schema.properties[column].anyOf[0]
        let ret

        switch(true){
            case (combo.type==='integer'):
                ret = "INT"
                break
            case (combo.type==='number'):

                ret =  "FLOAT8"
                break
            case (combo.type==='string'):
   
                ret = "varchar(100)"
                break
            case (combo.type==='string' && combo.format==='date'):

                ret =  "DATE"
                break
            
        }

        return ret


    })
}

module.exports = fp(typeParsePlugin, {
    // fastify: '4.x',
    name: 'typeParsePlugin',
  });

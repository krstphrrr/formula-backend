const ingredientSchema = {
    $id: 'ingredients',
    type: 'object',
      properties: {
        ingredientId: {  anyOf: [{ type: 'integer' }, { type: 'string' }, { type: 'array', items: { type: 'integer' } }] },
        ingredientName: { anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] },
        CAS: { anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] },
        category: { anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] },
        supplier: { anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] },
        inventory: { anyOf: [{ type: 'number' }, { type: 'string' }, { type: 'array', items: { type: 'number' } }] },
        ifralimit: { anyOf: [{ type: 'number' }, { type: 'string' }, { type: 'array', items: { type: 'number' } }] },
        dateAcquired: { anyOf: [{ type: 'string', format: 'date' }, { type: 'array', items: { type: 'string', format: 'date' } }] },
        DateLoadedInDb: { anyOf: [{ type: 'string', format: 'date' }, { type: 'array', items: { type: 'string', format: 'date' } }] },
        description: { anyOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }] },
        strength: {  anyOf: [{ type: 'integer' }, { type: 'string' }, { type: 'array', items: { type: 'integer' } }] },
        substantivity: {  anyOf: [{ type: 'integer' }, { type: 'string' }, { type: 'array', items: { type: 'integer' } }] },
        recommendedMax: {  anyOf: [{ type: 'integer' }, { type: 'string' }, { type: 'array', items: { type: 'integer' } }] },
        pyramidEstimate: {  anyOf: [{ type: 'integer' }, { type: 'string' }, { type: 'array', items: { type: 'integer' } }] },
        
      },
  };
  
  module.exports = ingredientSchema
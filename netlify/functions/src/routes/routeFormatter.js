const { Op }= require("sequelize");
const { errJSON, notFound } = require("./errors.js");

function relationGetter( model, attributes, res ){
  res.locals.data = { 
    include:[ 
      {
        model, 
        attributes,
        through:{ attributes:[] }
      } 
    ],
    distinct:true 
  };
};

async function getMany(Model, query, res, notFoundData){
  if(!res.locals.data)res.locals.data={};
  res.locals.data={
    ...res.locals.data,
    attributes:{...res.locals.data.attributes},
    limit:(query.perPage || 12),
    offset:(query.index || 0),
    order: [["id", "ASC"]]
  };
  const queries = Object.keys(Model.getAttributes()).filter(prop=>Object.keys(query).includes(prop));
  if(queries.length){
    if(!res.locals.data.where)res.locals.data.where={};
    queries.forEach(prop=>{
      if(prop!=="diets"){
        switch(Model.getAttributes()[prop].type.constructor.key){
          case "ARRAY":
            query[prop] = JSON.parse( query[prop] );
            query[prop] = query[prop].map(el=>el.toLowerCase());
            res.locals.data.where[prop]={ ...res.locals.data.where[prop], [Op.contains]:query[prop] };
          break;
          case "STRING":
            query[prop] = query[prop].toLowerCase();
            res.locals.data.where[prop]={ ...res.locals.data.where[prop], [Op.substring]:query[prop] };
          break;
          default: res.locals.data.where[prop]=query[prop];
        };
      };
    });
  };

  Model.findAndCountAll(res.locals.data)
  .then(_data=>{
    if(_data&&_data.rows.length){
      if( Model.name==="dish" || Model.name==="drink" ){
        for(let a = 0; a<_data.rows.length; a++){
          _data.rows[a] = _data.rows[a].get({plain:true});
          _data.rows[a].diets = _data.rows[a].diets.map(diet=>diet.name);
        };
      };
      res.json( _data );
    }else{
      res.status(404).json(errJSON("not_found", notFound(notFoundData)));
    };
  });
};

module.exports = {
  relationGetter,
  getMany
};
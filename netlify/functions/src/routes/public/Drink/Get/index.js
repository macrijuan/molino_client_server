const { Router }  = require("express");
const router = Router();
const { Op }  = require("sequelize");
const { Drink, Diet } = require("../../../../db.js");
const { getMany, relationGetter } = require("../../../routeFormatter.js");

router.get("/drink/get_drinks", async(req,res)=>{
  if(req.query.diets){
    req.query.diets = JSON.parse( req.query.diets );
    req.query.diets = req.query.diets.map(diet=>diet.toLowerCase());
    res.locals.data = {};
    res.locals.data.include={
      model:Diet,
      where:{
        name:{ [ Op.in ]:req.query.diets }
      },
      attributes:[ 'name' ],
      through:{ attributes:[] },
    };
  }else{
    relationGetter( Diet, [ "name" ], res );
  };
  await getMany( Drink, req.query, res, "Drinks");
});

module.exports = router;
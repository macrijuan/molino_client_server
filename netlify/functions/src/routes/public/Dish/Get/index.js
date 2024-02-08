const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");
const format = require("./Controller/format.js");
// const clauseSetter = require("./Controller/clauseSetter.js");
const { Dish, Diet }=require("../../../../db.js");
const { getMany, relationGetter } = require("../../../routeFormatter.js");
const { notFound, unknown, errJSON } = require("../../../errors.js");

router.get("/get_dishes", async(req,res)=>{
	try{
		if(req.query.diets){
			req.query.diets = JSON.parse( req.query.diets );
			req.query.diets = req.query.diets.map(diet=>diet.toLowerCase());
			res.locals.data = {
				include:[{
					model:Diet,
					where:{
						name:{ [ Op.in ]:req.query.diets }
					},
					attributes:[ 'name' ],
					through:{ attributes:[] },
				}],
				distinct: true
			};
		}else{
			relationGetter( Diet, [ "name" ], res );
		};
		await getMany( Dish, req.query, res, "Dishes" );
	}catch( err ){
		console.log( err );
		res.status( 500 ).json( errJSON( "unknown", unknown ) );
	};
});

router.get("/get_tastes",
async(req,res)=>{
	try{
		res.status(200).json(Dish.getAttributes().taste.values);
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

router.get("/test",
async(req,res)=>{
	try{

	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

module.exports = router;
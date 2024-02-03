const { Router } = require('express');
const router = Router();
const { Op, literal, fn } = require("sequelize");
const format = require("./Controller/format.js");
const clauseSetter = require("./Controller/clauseSetter.js");
const { Dish, Diet, dish_diets }=require("../../../../db.js");
const { getMany, relationGetter } = require("../../../routeFormatter.js");
const { notFound, unknown, errJSON } = require("../../../errors.js");

router.get("/get_dishes", async(req,res)=>{
	try{
		if(!req.query.diets)relationGetter( Diet, [ "id", "description" ], res );
		// res.json();
		await getMany( Dish, req.query, res, "Dishes" );
	}catch( err ){
		console.log( err );
		res.status( 500 ).json( errJSON( "unknown", unknown ) );
	};
});

router.get("/get_dish/:id", async(req,res)=>{
	try{
		Dish.findByPk(req.params.id)
		.then((result)=>{
			if(result){
				delete result.dataValues.updatable;
				res.json(result);
			}else{
				res.status(404).json(errJSON("not_found", notFound("Dish")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
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
		Dish.findAndCountAll({
			limit:12,
			offset:0,
			include:{
				model:Diet,
				where:{
					name:{ [ Op.in ]:JSON.parse( req.query.diets ) }
				},
				attributes:[ 'name' ],
				through:{ attributes:[] }
			}
		})
		.then(dishes=>{
			if(dishes.rows.length){
				res.json(dishes);
			}else{
				res.status(500).json(errJSON("not_found", notFound("Dishes")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

module.exports = router;
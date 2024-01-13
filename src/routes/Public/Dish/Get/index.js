const { Router } = require('express');
const router = Router();
const format = require("./Controller/format.js").handler;
const clauseSetter = require("./Controller/clauseSetter.js").handler;
const {Dish}=require("../../../../db.js").handler;
const {notFound, unknown, errJSON} = require("../../../error.js").handler;

router.get("/get_dishes", async(req,res)=>{
	try{
		Dish.findAndCountAll({limit:req.query.perPage, offset:req.query.index, attributes:{exclude:["updatable"]}})
		.then((result)=>{
			if(result&&result.rows.length){
				res.status(200).json(result);
			}else{
				res.status(404).json(errJSON("not_found", notFound("Dish")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
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

router.get("/get_by_filter",
format,
clauseSetter,
async(req,res)=>{
	try{
		Dish.findAndCountAll({
			where:res.locals.dataToMatch,
			limit:req.query.perPage,
			offset:req.query.index,
			attributes:{exclude:["updatable"]}
		}).then((result)=>{
			res.status(200).json(result);
		}).catch(()=>{
			res.status(404).json(errJSON("not_found", notFound("Dish/es")));
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

module.exports.handler = router;
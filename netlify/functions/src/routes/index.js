const { Router } = require('express');
const router = Router();
const {Diet}=require("../db.js");
// const public = require("./Public");

router.get("/", (req,res)=>{res.send('API status: OK')});

router.get("/test", async(req,res)=>{
  Diet.findAll().then(diets=>{res.json(diets)}).catch(err=>{res.json({err:err})});
});

// router.use( "/public", public );

module.exports = router;
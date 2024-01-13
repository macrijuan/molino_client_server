const { Router } = require('express');
const router = Router();

const public = require("./Public/index.js")
const test = require("./Z_Empty_Folder/index.js");

router.get("/", (req,res)=>{res.send('API status: OK')});

router.use( "/public", public.handler );

module.exports.handler = router;
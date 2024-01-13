const { Router } = require('express');
const router = Router();
const format = require("./Controller/format.js").handler;
const existing = require("./Controller/existing.js").handler;
const { User }=require("../../../../db.js").handler;
const { unknown }=require("../../../error.js").handler;
const { dobleSpaceEraser }=require("../../../../formatter.js").handler;

router.post("/post_user", format, existing, async(req,res)=>{
  try{
    const {email, password, first_name, last_name}=req.body;
    User.create({ email, password, first_name:dobleSpaceEraser(first_name), last_name:dobleSpaceEraser(last_name) })
    .then((newAdmin=>{
      delete newAdmin.dataValues.password;
      delete newAdmin.dataValues.updatable;
      res.status(200).json(newAdmin.dataValues);
    }));
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports.handler = router;
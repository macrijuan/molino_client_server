const {Router}=require("express");
const router=Router();

router.get("/asdf", async(req,res)=>{
  res.json("HOLAAAA");
});

module.exports.handler=router;
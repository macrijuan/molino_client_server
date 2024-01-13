const{Router}=require("express");
const router = Router();

router.get("/", async(req,res)=>{
  res.json("HOLAAAA");
});

module.exports.handler=router;
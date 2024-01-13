const{Router}=require("express");
const router = Router();

router.get("/public", async(req,res)=>{
  res.json("HOLAAAA");
});

module.exports=router;
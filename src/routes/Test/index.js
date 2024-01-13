const { Router }=require("express");
const router = Router();

router.get("/asdf", (res,res)=>{
  res.json("HEY!");
});

module.exports.handler = router;

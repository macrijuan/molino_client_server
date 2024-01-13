const {Router}=require("express");
const router = Router();
const getTable=require("./Get/index.js");

router.use("/table", getTable);

module.exports = router;
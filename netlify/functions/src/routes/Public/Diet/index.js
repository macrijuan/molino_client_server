const {Router}=require("express");
const router = Router();
const getDiet = require("./Get/index.js");

router.use("/diet", getDiet);

module.exports = router;
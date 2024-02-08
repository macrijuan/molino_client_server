const { Router }  = require("express");
const router = Router();
const drinks = require("./Get");

router.use( "/drink", drinks );

module.exports = router;
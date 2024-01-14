const { Router } = require('express');
const router = Router();
const postUser = require("./Post/index.js");
const getUser = require("./Get/index.js");
const putUser = require("./Put_Update/index.js");
const deleteUser = require("./Delete/index.js");

router.use("/user", postUser, getUser, putUser, deleteUser);

module.exports = router;

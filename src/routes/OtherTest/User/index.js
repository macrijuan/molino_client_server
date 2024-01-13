const { Router } = require('express');
const router = Router();
const postUser = require("./Post/index.js").handler;
const getUser = require("./Get/index.js").handler;
const putUser = require("./Put_Update/index.js").handler;
const deleteUser = require("./Delete/index.js").handler;

router.use("/user", postUser, getUser, putUser, deleteUser);

module.exports.handler = router;

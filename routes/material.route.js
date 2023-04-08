const express = require('express');
const router = express.Router();
const MaterialController = require('../controller/material.controller');
const { upload } = require('../helpers/uloadImage');
// const authAdmin = require("../middleware/adminAuth");
// const auth = require("../middleware/auth.middleware");

/* GET home page. */
router.post('/create', upload.single('file'), MaterialController.create);
module.exports = router;
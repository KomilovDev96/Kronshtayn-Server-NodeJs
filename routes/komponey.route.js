const express = require('express');
const router = express.Router();
const componeyController = require('../controller/componey.controller');
const { upload } = require('../helpers/uloadImage');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");

/* GET home page. */
router.post('/create', authAdmin, auth, upload.single('file'), componeyController.create);
router.put('/update/:id', authAdmin, auth, upload.single('file'), componeyController.update)
router.delete('/delete/:id',  componeyController.delete)
router.get('/read/:id', componeyController.read);
router.get('/getall', componeyController.getAll);
router.get('/getall/:id', componeyController.getfive);
module.exports = router;
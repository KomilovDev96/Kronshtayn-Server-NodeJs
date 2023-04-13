const express = require('express');
const router = express.Router();
const MaterialController = require('../controller/material.controller');
const { upload } = require('../helpers/uloadImage');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");

/* GET home page. */
router.post('/create', auth, authAdmin, upload.single('file'), MaterialController.create);
router.delete('/delete/:id', auth, authAdmin, upload.single('file'), MaterialController.delete);
router.put('/update/:id', auth, authAdmin, upload.single('file'), MaterialController.update);
router.get('/read/:id', MaterialController.read);
router.get('/getall', MaterialController.getAll);
router.get('/getall/proiz', MaterialController.getAllProiz);
module.exports = router;
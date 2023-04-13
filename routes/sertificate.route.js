const express = require('express');
const router = express.Router();
const SertificateController = require('../controller/sertificate.controller');
const { upload } = require('../helpers/uloadImage');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");

/* GET home page. */
router.post('/create',  upload.single('file'), SertificateController.create);
router.put('/update/:id',  upload.single('file'), SertificateController.update)
router.delete('/delete/:id',  SertificateController.delete)
router.get('/read/:id', SertificateController.read);
router.get('/getall', SertificateController.getAll);
module.exports = router;
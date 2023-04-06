const express = require('express');
const router = express.Router();
const UslugiController = require('../controller/uslugi.controller');
const { upload } = require('../helpers/uloadImage');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");

/* GET home page. */
router.post('/create',auth, authAdmin, upload.single('file'), UslugiController.create);
router.get('/read/:id', UslugiController.read);
router.get('/getall', UslugiController.getAll);
router.delete('/delete/:id',auth, authAdmin, UslugiController.delete )
router.put('/update/:id',auth, authAdmin, upload.single('file'), UslugiController.update )
module.exports = router;
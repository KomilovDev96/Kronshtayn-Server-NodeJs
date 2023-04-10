const express = require('express');
const router = express.Router();
const proizController = require('../controller/proiz.controller');
const { upload } = require('../helpers/uloadImage');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");


/* GET home page. */
router.post('/create', auth, authAdmin, upload.array('files'), proizController.create);
router.delete('/delete/:id', auth, authAdmin, proizController.delete)
router.delete('/delete/image/:id/:iid', proizController.deleteImage)
router.put('/update/:id', auth, authAdmin, upload.single('file'), proizController.update)
router.get('/read/:id', proizController.read);
router.get('/getall', proizController.getAll);
module.exports = router;


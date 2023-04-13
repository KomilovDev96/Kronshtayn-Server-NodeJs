const express = require('express');
const router = express.Router();
const proizController = require('../controller/proiz.controller');
const { upload } = require('../helpers/uloadImage');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");


/* GET home page. */
router.post('/create', upload.array('iamges'), proizController.create);
router.delete('/delete/:id', proizController.delete)
router.delete('/delete/image/:id/:iid', proizController.deleteImage)
router.put('/update/:id',  upload.array('iamges'), proizController.update)
router.get('/read/:id', proizController.read);
router.get('/getall', proizController.getAll);
router.get('/getall/mater', proizController.getAllMater);
module.exports = router;


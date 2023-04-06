const express = require('express');
const router = express.Router();
const categController = require('../controller/category.controller');
const { upload } = require('../helpers/uloadImage');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");
/* GET home page. */

router.post('/create', auth, authAdmin, upload.single('file'), categController.create);
router.delete('/delete/:id', auth, authAdmin, categController.delete)
router.put('/update/:id', auth, authAdmin, upload.single('file'), categController.update)
router.get('/read/:id', categController.read);
router.get('/getall', categController.getAll);

module.exports = router;
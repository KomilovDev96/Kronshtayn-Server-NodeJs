const express = require('express');
const router = express.Router();
const NewsController = require('../controller/news.controller');
const { upload } = require('../helpers/uloadImage');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");

/* GET home page. */
router.post('/create',auth, authAdmin, upload.single('file'), NewsController.create);
router.get('/read/:id', NewsController.read);
router.get('/getall', NewsController.getAll);
router.delete('/delete/:id',auth, authAdmin, NewsController.delete)
router.put('/update/:id', auth, authAdmin, upload.single('file'), NewsController.update)
module.exports = router;
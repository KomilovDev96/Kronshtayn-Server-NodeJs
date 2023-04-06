const express = require('express');
const router = express.Router();
const ContactController = require('../controller/contact.controller');
const { upload } = require('../helpers/uploadFile');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");

/* GET home page. */
router.post('/create',  upload.single('file'), ContactController.create);
router.delete('/delete/:id', auth, authAdmin, ContactController.delete);
router.get('/getall', auth, authAdmin, ContactController.getAll);
router.get('/read/:id', auth, authAdmin, ContactController.read);

module.exports = router;
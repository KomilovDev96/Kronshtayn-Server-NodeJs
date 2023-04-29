const express = require('express');
const router = express.Router();
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");
const ContactEdidController = require('../controller/contactEdit.controller');

/* GET home page. */
router.post('/create', ContactEdidController.create);
router.put('/edit/:id', ContactEdidController.update);
router.get('/read/:id', ContactEdidController.read);
router.delete('/delete/:id', ContactEdidController.delete);
router.get('/getall', ContactEdidController.getall);

module.exports = router;
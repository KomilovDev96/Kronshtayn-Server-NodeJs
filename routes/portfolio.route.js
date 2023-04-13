const express = require('express');
const router = express.Router();
const PortfolioController = require('../controller/portfolio.controller');
const { upload } = require('../helpers/uloadImage');
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth.middleware");

/* GET home page. */
router.post('/create', auth, authAdmin, upload.single('file'), PortfolioController.create);
router.get('/read/:id', PortfolioController.read);
router.get('/getall', PortfolioController.getAll);
router.delete('/delete/:id', auth, authAdmin, PortfolioController.delete)
router.put('/update/:id', auth, authAdmin, upload.single('file'), PortfolioController.update)
module.exports = router;
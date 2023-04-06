const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth.controller');
const auth = require("../middleware/auth.middleware");

/* GET home page. */
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/auth', auth, AuthController.auth,)
module.exports = router;
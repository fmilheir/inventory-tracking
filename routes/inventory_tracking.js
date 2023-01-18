const express = require('express');
const router = express.Router();
const inventory = require('../controllers/record');

router.get('/',inventory.homepage);
router.get('/About',inventory.About);
router.get('/pricing', inventory.pricing);
router.get('/login',inventory.login);
router.get('/signup',inventory.signup);
module.exports = router;

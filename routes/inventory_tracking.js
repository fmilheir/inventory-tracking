const express = require('express');
const router = express.Router();
const inventory = require('../controllers/record');

router.get('/',inventory.homepage);
module.exports = router;

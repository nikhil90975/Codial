const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friends_controller.js');

router.get('/create/:id',friendsController.create);


module.exports = router;
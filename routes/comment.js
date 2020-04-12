const express = require('express');
const router = express.Router();
//authenticate for posting
const passport = require('passport')
//fetch post

const commentController = require('../controllers/comment_controller');

router.post('/create',passport.checkAuthentication,commentController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);

module.exports = router;
const express = require('express');
const router = express.Router();
//fetch post

const postController = require('../controllers/post_controller');

router.post('/create',postController.create);
router.get('/delete-post',postController.delete);

module.exports = router;
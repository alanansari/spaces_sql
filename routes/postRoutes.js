const express = require('express');
const Upload = require('../middleware/upload');
const validation = require('../middleware/authveriftoken');

const postController = require('../controller/postController');

const router = express.Router();


router.get('/feed',postController.getfeed);
router.post('/newpost',validation.authverifytoken, Upload.uploadImg.single('image'), postController.newpost);


module.exports = router;
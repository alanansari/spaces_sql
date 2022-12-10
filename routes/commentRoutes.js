const express = require('express');

const validation = require('../middleware/authveriftoken');
const commentController = require('../controller/commentController');

const router = express.Router();

router.post('/comment',validation.authverifytoken,commentController.comment);

module.exports = router;
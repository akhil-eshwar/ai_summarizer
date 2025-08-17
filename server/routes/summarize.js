const express = require('express');
const { summarizeTranscript } = require('../controllers/summarizeController');

const router = express.Router();

router.post('/', summarizeTranscript);

module.exports = router;

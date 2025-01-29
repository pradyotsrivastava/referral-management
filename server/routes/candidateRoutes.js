const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const jwtMiddleware = require('../middleware/authMiddleware');

// Protect candidate routes with authentication middleware
router.post('/', jwtMiddleware, candidateController.addCandidate);
router.get('/', jwtMiddleware, candidateController.getCandidates);
router.put('/:id/status', jwtMiddleware, candidateController.updateStatus);

module.exports = router;

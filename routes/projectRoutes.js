const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createProject, getUserProjects , getProjectStats} = require('../controllers/projectController');

router.post('/', auth, createProject);
router.get('/', auth, getUserProjects);
router.get('/:projectId/stats', auth, getProjectStats);

module.exports = router;

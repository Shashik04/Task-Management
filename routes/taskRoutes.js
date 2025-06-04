const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addTask,updateTask,deleteTask, assignTask, markComplete, getProjectStats
} = require('../controllers/taskController');

router.post('/', auth, addTask);
router.put('/:id',auth,updateTask);
router.delete('/:id',auth,deleteTask);
router.put('/assign', auth, assignTask);
router.put('/:id/complete', auth, markComplete);
router.get('/stats/:projectId', auth, getProjectStats);

module.exports = router;

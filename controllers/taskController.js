const Task = require('../Models/Task');

exports.addTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,       
      runValidators: true 
    });

    if (!updatedTask) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json({ msg: 'Task deleted successfully', task: deletedTask });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.assignTask = async (req, res) => {
  const { taskId, userId } = req.body;
  const task = await Task.findByIdAndUpdate(taskId, { assignedTo: userId }, { new: true });
  res.json(task);
};

exports.markComplete = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
  res.json(task);
};

exports.getProjectStats = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log("Requested Project ID:", projectId);

    const completedCount = await Task.countDocuments({ project: projectId, status: 'completed' });
    const totalCount = await Task.countDocuments({ project: projectId });

    console.log(`Completed Tasks: ${completedCount}, Total Tasks: ${totalCount}`);

    res.json({ completed: completedCount, total: totalCount });
  } catch (error) {
    console.error("Error getting project stats:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

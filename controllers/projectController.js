const Project = require('../Models/Project');
const Task = require('../Models/Task')

exports.createProject = async (req, res) => {
  const project = new Project({ ...req.body, createdBy: req.user.id });
  await project.save();
  res.json(project);
};

exports.getUserProjects = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.id });
  res.json(projects);
};

exports.getProjectStats = async (req, res) => {
  try {
    const { projectId } = req.params;

    const completedCount = await Task.countDocuments({ project: projectId, status: 'completed' });
    const totalCount = await Task.countDocuments({ project: projectId });

    res.json({ completed: completedCount, total: totalCount });
  } catch (error) {
    console.error('Error fetching project stats:', error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

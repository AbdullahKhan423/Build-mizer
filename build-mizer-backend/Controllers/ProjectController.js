import Project from '../Models/ProjectModel.js'; // Adjust the path as per your project structure



// Get a list of all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('projectManager'); 
    // Populate the projectManager field with user data
    return res.status(200).json(projects); 
  } catch (error) {
    return res.status(500);
  }
};
// Create a new project
export const createProject = async (req, res) => {
    try {
      const newProject = new Project(req.body); // Assuming the request body contains project data
      const savedProject = await newProject.save();
      return res.status(200).json(savedProject);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  };

// Get details of a specific project by its ID
export const getProjectById = async (req, res) => {
  console.log("done");
  try {
    const project = await Project.findById(req.params.id).populate('projectManager'); // Assuming the project ID is in the URL params
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(project);
   
  } catch (error) {
   return res.status(500).json({ error: error.message });
  }
};

// Update a project by its ID
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a project by its ID
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndRemove(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

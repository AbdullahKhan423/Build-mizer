// controllers/calculatorController.js
import Calculator from '../Models/CalculatorModel.js';
import Project from '../Models/ProjectModel.js';

// Create a new calculator item
export const createCalculatorItem = async (req, res) => {
    try {
      const {
        squareFeet,
      } = req.body;
  
      const project = await Project.findById(req.params.projectId);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      const sandRate = 83;  // Set your default values
      const crushRate = 146;  // Set your default values
      const bricksRate = 26;  // Set your default values
      const cementRate = 1220;  // Set your default values
  
      const sandQuantity = 1815 / 675;  // Set your default values
      const crushQuantity = 1033 / 675;  // Set your default values
      const bricksQuantity = 33757 / 675;  // Set your default values
      const cementQuantity = 363 / 675;  // Set your default values
  
      const sandCost = sandRate * sandQuantity * squareFeet;
      const crushCost = crushRate * crushQuantity * squareFeet;
      const bricksCost = bricksRate * bricksQuantity * squareFeet;
      const cementCost = cementRate * cementQuantity * squareFeet;
  
      const totalCost = sandCost + crushCost + bricksCost + cementCost;
  
      const newItem = new Calculator({
        squareFeet,
        steelRate: 0,  // Set your default values or handle these fields as needed
        steelQuantity: 0,  // Set your default values or handle these fields as needed
        sandRate,
        sandQuantity,
        crushRate,
        crushQuantity,
        bricksRate,
        bricksQuantity,
        cementRate,
        cementQuantity,
        totalCost,
        project: project._id,
      });
  
      const savedItem = await newItem.save();
  
      project.newItem = project.newItem || [];
      project.newItem.push(savedItem._id);
      await project.save();
  
      res.status(201).json(savedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  };
  

// Get all calculator items
export const getCalculatorItems = async (req, res) => {
  try {
    const items = await Calculator.find({ project: req.params.projectId });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single calculator item by ID
export const getCalculatorItemById = async (req, res) => {
  try {
    const item = await Calculator.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a calculator item by ID
export const updateCalculatorItem = async (req, res) => {
  try {
    const item = await Calculator.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a calculator item by ID
export const deleteCalculatorItem = async (req, res) => {
  try {
    const item = await Calculator.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// controllers/calculatorController.js
import Calculator from '../Models/CalculatorModel.js';
import Project from '../Models/ProjectModel.js';
import Brick from '../Models/Materials/Bricks.js';
import Cement from '../Models/Materials/Cement.js';
import Crush from '../Models/Materials/Crush.js';
import Sand from '../Models/Materials/Sand.js';
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
  
      const persqsandQuantity = 1815 / 675;  // Set your default values
      const persqcrushQuantity = 1033 / 675;  // Set your default values
      const persqbricksQuantity = 33757 / 675;  // Set your default values
      const persqcementQuantity = 363 / 675;  // Set your default values
  
      const sandCost = sandRate * persqsandQuantity * squareFeet;
      const crushCost = crushRate * persqcrushQuantity * squareFeet;
      const bricksCost = bricksRate * persqbricksQuantity * squareFeet;
      const cementCost = cementRate * persqcementQuantity * squareFeet;
      
      const sandQuantity= persqsandQuantity*squareFeet;
      const bricksQuantity=persqbricksQuantity*squareFeet;
      const cementQuantity=persqcementQuantity*squareFeet;
      const crushQuantity=persqcrushQuantity*squareFeet;


      const totalCost = sandCost + crushCost + bricksCost + cementCost;
      const brickQuantityDifference=0;
      const sandQuantityDifference=0;
      const crushQuantityDifference=0;
      const cementQuantityDifference=0;
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
        brickQuantityDifference,
        sandQuantityDifference,
        crushQuantityDifference,
        cementQuantityDifference,
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
  
export const calculateMaterialQuantityDifference = async (req,res) => {
  try {
    // Retrieve the calculator document for the specified project
    const calculator = await Calculator.findOne({ project: req.params.projectId });
   
    // Retrieve the 'received' brick entries for the specified project
    const receivedBricks = await Brick.find({ project: req.params.projectId, status: 'received' });
    const receivedCement= await Cement.find({project:req.params.projectId, status:'received'});
    const receivedSand= await Sand.find({project:req.params.projectId,status:'received'});
    const receivedCrush= await Crush.find({project:req.params.project,status:'received'});
    // Calculate the difference for bricks
    const estimatedBricksQuantity = calculator.bricksQuantity || 0;
    const actualBricksQuantity = receivedBricks.reduce((total, brick) => total + brick.quantity, 0);
    const brickQuantityDifference = estimatedBricksQuantity - actualBricksQuantity;
    //Difference for cement
    const estimatedCementQuantity= calculator.cementQuantity ||0;
    const actualCementQuantity= receivedCement.reduce((total,cement)=>total+cement.quantity,0);
    const cementQuantityDifference=estimatedCementQuantity-actualCementQuantity;
    //Difference for crush
    const estimatedCrushQuantity=calculator.crushQuantity||0;
    const actualCrushQuantity=receivedCement.reduce((total,crush)=>total+crush.quantity,0);
    const crushQuantityDifference=estimatedCrushQuantity-actualCementQuantity;
    //Difference for sand
    const estimatedSandQuantity=calculator.sandQuantity||0;
    const actualSandQuantity=receivedSand.reduce((total,sand)=>total+sand.quantity,0);
    const sandQuantityDifference=estimatedSandQuantity-actualSandQuantity;
    // Update the calculator document with the calculated difference
    calculator.brickQuantityDifference = brickQuantityDifference;
    calculator.cementQuantityDifference=cementQuantityDifference;
    calculator.crushQuantityDifference=crushQuantityDifference;
    calculator.sandQuantityDifference=sandQuantityDifference;
    await calculator.save();

    // Repeat the process for other material types (cement, crush, sand) as needed

    console.log('Material quantity differences calculated and updated successfully.');
    return res.status(200).json({ success: true, brickQuantityDifference,sandQuantityDifference,crushQuantityDifference,cementQuantityDifference });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
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

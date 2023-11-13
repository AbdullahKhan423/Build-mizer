// models/calculatorModel.js
import mongoose from 'mongoose';

const calculatorSchema = new mongoose.Schema({
  squareFeet: {
    type: Number,
    required: true,
  },
  steelRate: {
    type: Number,
  },
  steelQuantity: {
    type: Number,
  },
  sandRate: {
    type: Number,
  },
  sandQuantity: {
    type: Number,
  },
  crushRate: {
    type: Number,
  },
  crushQuantity: {
    type: Number,
  },
  bricksRate: {
    type: Number,
  },
  bricksQuantity: {
    type: Number,
  },
  cementRate: {
    type: Number,
  },
  cementQuantity: {
    type: Number,
  },
  totalCost: {
    type: Number,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Reference to the Project model
    required: true,
  },
});

const Calculator = mongoose.model('Calculator', calculatorSchema);

export default Calculator;

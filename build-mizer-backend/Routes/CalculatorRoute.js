import express  from "express";
import {createCalculatorItem, getCalculatorItemById, getCalculatorItems, deleteCalculatorItem,updateCalculatorItem} from '../Controllers/CalculatorController.js';
import { authenticateUserForProjects } from "../Middlewares/ProjectMiddleware.js";

const router= express.Router();

router.get('/:projectId/',authenticateUserForProjects,getCalculatorItems);
router.post('/:projectId/',authenticateUserForProjects,createCalculatorItem);
router.get('/byId/:id',authenticateUserForProjects,getCalculatorItemById);
router.delete('/:id',authenticateUserForProjects,deleteCalculatorItem);
router.put('/:id',authenticateUserForProjects,updateCalculatorItem);

export default router;
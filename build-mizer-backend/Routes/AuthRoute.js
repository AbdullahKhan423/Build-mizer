import { Signup } from "../Controllers/AuthController.js";
import { Router } from "express";

import {Login} from '../Controllers/AuthController.js';
import { userVerification} from "../Middlewares/AuthMiddleware.js";
import { Logout } from "../Controllers/AuthController.js";
const router = Router();
router.post("/signup", Signup);
router.post('/login', Login);
router.post('/',userVerification);
router.get('/logout', Logout);



router.post("/signup", Signup);


export default router;

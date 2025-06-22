import express from 'express';
import { sendPrompt } from '../controller/prompt.controller.js';
import userMiddleware from '../middleware/prompt.middleware.js';
const router = express.Router();
router.post("/prompt",userMiddleware,sendPrompt);//this function from prompt.middleware is used for the verification of user
//it checks when the user is coming from prompt firstly check the user is valid or not

export default router;

import { test } from "../controllers/test.controller.js"
import { addEmployee } from "../controllers/EMployee.controller.js";
import express from 'express'
const router = express.Router();

router.route('/test')
	.get(test);


router.route('/test/:uid')
	.delete(test);

router.route('/test')
	.post(test);

router.route('/add-employee')
	.post(addEmployee);

export default router;

import { test } from "../controllers/test.controller.js"
import { addEmployee,temp,updateEmployee,assignEmployee,deleteEmployee,fetchEmployee } from "../controllers/EMployee.controller.js";
import express from 'express'
const router = express.Router();

router.route('/addEmployee')
	.post(addEmployee);

router.route('/updateEmployee')
    .put(updateEmployee)

router.route('/assignEmployee')
    .post(assignEmployee)

router.route('/deleteEmployee')
    .delete(deleteEmployee)

router.route('/fetchEmployee')
    .get(fetchEmployee)

router.route('/temp')
    .get(temp)

export default router;
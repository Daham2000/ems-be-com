import express from 'express';
import { addEmployee, addMotivationRequest, getEmployeeList, updateEmployee } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.employee.add), addEmployee);
router.patch('/', ValidateJoi(Schemas.employee.update), updateEmployee);
router.get('/', getEmployeeList);
router.post('/motivation-add', ValidateJoi(Schemas.motivation.add), addMotivationRequest);

export = router;
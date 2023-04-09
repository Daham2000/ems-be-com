import express from 'express';
import { addEmployee, addMotivationRequest, deleteEmployee, getEmployeeList, getSingleEmployeeDetails, updateEmployee } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.employee.add), addEmployee);
router.patch('/', ValidateJoi(Schemas.employee.update), updateEmployee);
router.get('/', getEmployeeList);
router.get('/me', getSingleEmployeeDetails);
router.post('/motivation-add', ValidateJoi(Schemas.motivation.add), addMotivationRequest);
router.delete('/employee-delete/', deleteEmployee);

export = router;
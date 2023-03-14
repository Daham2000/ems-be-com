import express from 'express';
import { addEmployee, addMotivationRequest, getEmployeeList } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.employee.add), addEmployee);
router.get('/', getEmployeeList);
router.post('/motivation-add', ValidateJoi(Schemas.motivation.add), addMotivationRequest);

export = router;
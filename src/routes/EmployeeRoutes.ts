import express from 'express';
import { addEmployee, addMotivationRequest } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.employee.add), addEmployee);
router.post('/motivation-add', ValidateJoi(Schemas.motivation.add), addMotivationRequest);

export = router;
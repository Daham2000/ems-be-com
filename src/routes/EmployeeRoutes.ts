import express from 'express';
import { addEmployee } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.employee.add), addEmployee);

export = router;
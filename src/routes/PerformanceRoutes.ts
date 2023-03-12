import express from 'express';
import { addPerformance } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.performance.add), addPerformance);

export = router;
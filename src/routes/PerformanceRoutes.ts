import express from 'express';
import { addPerformance, getPerformanceReportList } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.performance.add), addPerformance);
router.get('/', getPerformanceReportList);

export = router;
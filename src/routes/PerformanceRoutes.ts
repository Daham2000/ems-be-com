import express from 'express';
import { addPerformance, deleteEmployee, deletePerformanceReport, getPerformanceReportList, updatePerformanceReport } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.performance.add), addPerformance);
router.patch('/', ValidateJoi(Schemas.performance.update), updatePerformanceReport);
router.get('/', getPerformanceReportList);
router.delete('/', deletePerformanceReport);

export = router;
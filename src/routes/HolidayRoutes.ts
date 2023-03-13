import express from 'express';
import { addHoliday } from '../controllers/HolidayCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.holiday.add), addHoliday);

export = router;
import express from 'express';
import { addHoliday, getHolidayList } from '../controllers/HolidayCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.holiday.add), addHoliday);
router.get('/', ValidateJoi(Schemas.holiday.get), getHolidayList);

export = router;
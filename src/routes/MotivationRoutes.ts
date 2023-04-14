import express from 'express';
import { addMotivationRequest, getMotivationReqList } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.motivation.add), addMotivationRequest);
router.get('/', ValidateJoi(Schemas.motivation.get), getMotivationReqList);

export = router;
import express from 'express';
import { addMotivationRequest } from '../controllers/EmpCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/', ValidateJoi(Schemas.motivation.add), addMotivationRequest);

export = router;
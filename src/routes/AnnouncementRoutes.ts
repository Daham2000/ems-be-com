import express from 'express';
import { addAnnouncement } from '../controllers/AnnCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/announcement-add', ValidateJoi(Schemas.announcement.add), addAnnouncement);

export = router;
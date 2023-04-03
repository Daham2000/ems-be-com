import express from 'express';
import { addAnnouncement, getAnnoucementList } from '../controllers/AnnCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/announcement-add', ValidateJoi(Schemas.announcement.add), addAnnouncement);
router.get('/announcements', ValidateJoi(Schemas.announcement.get), getAnnoucementList);

export = router;
import express from 'express';
import { registerOrganization } from '../controllers/OrgCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/register', ValidateJoi(Schemas.organization.create), registerOrganization);

export = router;
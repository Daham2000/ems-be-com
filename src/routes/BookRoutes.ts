import express from 'express';
import { createBook } from '../controllers/BookCtrl';
import { Schemas, ValidateJoi } from '../util/validate';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.book.create), createBook);

export = router;
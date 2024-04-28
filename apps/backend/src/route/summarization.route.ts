import { Router } from 'express';

import {
  generateSummarization,
  getSummarizationList,
} from '../controller/summarization.controller';
import { validateArticle } from '../core/field-validator';
import { isAuthenticated } from '../middleware/is-authenticated.middleware';
import { handleValidationErrors } from '../middleware/validator.middleware';

const router = Router();

router.post('/', isAuthenticated, validateArticle, handleValidationErrors, generateSummarization);
router.get('/', isAuthenticated, getSummarizationList);

export const summarizationRouter: Router = router;

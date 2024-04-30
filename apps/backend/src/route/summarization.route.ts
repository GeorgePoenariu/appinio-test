import { Router } from 'express';

import { generateSummarization, getSummarizationList } from '../controller';
import { validateArticle } from '../core';
import { handleValidationErrors, isAuthenticated } from '../middleware';

const router = Router();

router.post('/', isAuthenticated, validateArticle, handleValidationErrors, generateSummarization);
router.get('/', isAuthenticated, getSummarizationList);

export const summarizationRouter: Router = router;

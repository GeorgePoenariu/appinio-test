import { Router } from 'express';

import { healthRouter } from './health';
import { summarizationRouter } from './summarization.route';
import { userRouter } from './user.route';

const router = Router();

router.use('/health', healthRouter);
router.use('/user', userRouter);
router.use('/summarization', summarizationRouter);

export const appRouter: Router = router;

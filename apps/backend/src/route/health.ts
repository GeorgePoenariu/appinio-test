import { Router } from 'express';

import { healthCheck } from '../controller';

const router = Router();

router.get('/', healthCheck);

export const healthRouter: Router = router;

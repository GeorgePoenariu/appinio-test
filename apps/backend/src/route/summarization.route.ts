import { Router } from "express";

import {
  generateSummarization,
  getSummarizationList,
} from "../controller/summarization.controller";
import { isAuthenticated } from "../middleware/is-authenticated.middleware";

const router = Router();

router.post("/", isAuthenticated, generateSummarization);
router.get("/", isAuthenticated, getSummarizationList);

export const summarizationRouter: Router = router;

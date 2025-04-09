import { Router } from 'express';

import {
  getRequestsController,
  getRequestByIdController,
  createRequestController,
  deleteRequestController,
  updateRequestController,
} from '../controllers/requests.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRequestSchema } from '../validation/requests.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/requests', ctrlWrapper(getRequestsController));

router.get(
  '/requests/:requestId',
  isValidId,
  ctrlWrapper(getRequestByIdController),
);

router.post(
  '/requests',
  validateBody(createRequestSchema),
  ctrlWrapper(createRequestController),
);

router.delete(
  '/requests/:requestId',
  isValidId,
  ctrlWrapper(deleteRequestController),
);

router.put(
  '/requests/:requestId',
  isValidId,
  validateBody(createRequestSchema),
  ctrlWrapper(updateRequestController),
);

export default router;

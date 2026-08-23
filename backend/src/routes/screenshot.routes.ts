import { Router } from 'express';
import {
  uploadScreenshot,
  deleteScreenshot,
  getTradeScreenshots,
} from '../controllers/screenshot.controller.js';
import  upload  from '../middleware/upload.middleware.js';
import  authJwt  from '../middleware/auth.middleware.js';
import requireVerified from '../middleware/requireVerified.js';
import { validate, validateParams } from '../middleware/validate.js';
import { deleteScreenshotParamSchema, uploadScreenshotSchema, screenshotTradeIdParamSchema } from '../validators/screenshot.validator.js';

const router = Router();

router.use(authJwt, requireVerified);

// GET screenshots for a trade
router.get('/trades/:tradeId/screenshots',validateParams(screenshotTradeIdParamSchema), getTradeScreenshots);

router.post('/trades/:tradeId/screenshots', validateParams(screenshotTradeIdParamSchema), upload.single('image'), validate(uploadScreenshotSchema), uploadScreenshot);

router.delete('/trades/:tradeId/screenshots/:id', validateParams(deleteScreenshotParamSchema), deleteScreenshot);

export default router;
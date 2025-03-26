import { Router } from 'express';
import { Request, Response } from 'express';
import { checkAuth } from "../middleware/auth";
import { generateVoucherController } from '../controllers/firewall.controller';

const router = Router();

router.post('/GenerateVoucher',checkAuth, generateVoucherController);

export default router;
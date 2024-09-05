import { Router } from 'express';
import { paymentController } from './payment.controller';

const router = Router();

router.post('/success', paymentController.confirmPayment);
router.post('/failed', paymentController.failedPayment);

export const paymentRoutes = router;

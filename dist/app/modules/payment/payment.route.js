"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post('/success', payment_controller_1.paymentController.confirmPayment);
router.post('/failed', payment_controller_1.paymentController.failedPayment);
exports.paymentRoutes = router;

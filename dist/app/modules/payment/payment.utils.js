"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const initialPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield axios_1.default.post(config_1.default.payment_url, {
        store_id: config_1.default.store_id,
        signature_key: config_1.default.signature_key,
        tran_id: paymentData === null || paymentData === void 0 ? void 0 : paymentData.transactionId,
        success_url: `http://localhost:5000/api/payment/success?transactionId=${paymentData.transactionId}`,
        fail_url: `http://localhost:5000/api/payment/failed?transactionId=${paymentData.transactionId}`,
        cancel_url: 'http://localhost:5173/',
        amount: paymentData === null || paymentData === void 0 ? void 0 : paymentData.amount,
        currency: 'BDT',
        desc: 'Merchant Registration Payment',
        cus_name: paymentData === null || paymentData === void 0 ? void 0 : paymentData.name,
        cus_email: paymentData === null || paymentData === void 0 ? void 0 : paymentData.email,
        cus_add1: paymentData === null || paymentData === void 0 ? void 0 : paymentData.address,
        cus_add2: null,
        cus_city: null,
        cus_state: null,
        cus_postcode: null,
        cus_country: null,
        cus_phone: paymentData === null || paymentData === void 0 ? void 0 : paymentData.mobile,
        type: 'json',
    });
    return result.data;
});
exports.initialPayment = initialPayment;

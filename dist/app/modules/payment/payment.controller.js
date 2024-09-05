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
exports.paymentController = void 0;
const path_1 = __importDefault(require("path"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const fs_1 = __importDefault(require("fs"));
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const confirmPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    // Adjust the path to point to the location of `success.html` in the `dist` directory
    const filePath = path_1.default.join(__dirname, '../../views/success.html');
    fs_1.default.readFile(filePath, 'utf8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        const checkPayment = yield axios_1.default.get(`https://sandbox.aamarpay.com/api/v1/trxcheck/request.php?request_id=${transactionId}&store_id=${config_1.default.store_id}&signature_key=${config_1.default.signature_key}&type=json`);
        if (((_a = checkPayment === null || checkPayment === void 0 ? void 0 : checkPayment.data) === null || _a === void 0 ? void 0 : _a.pay_status) === 'Successful') {
            yield booking_model_1.default.updateOne({ transactionId }, { paymentStatus: 'completed' });
        }
        // const updatePaymentStatus = Booking.updateOne();
        res.send(data);
    }));
}));
const failedPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    // Adjust the path to point to the location of `success.html` in the `dist` directory
    const filePath = path_1.default.join(__dirname, '../../views/failed.html');
    fs_1.default.readFile(filePath, 'utf8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        yield booking_model_1.default.updateOne({ transactionId }, { paymentStatus: 'failed' });
        res.send(data);
    }));
}));
exports.paymentController = { confirmPayment, failedPayment };

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SlotServices = void 0;
const http_status_1 = __importStar(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("./slot.model"));
const slot_utils_1 = require("./slot.utils");
const dateValidator_1 = require("../../utils/dateValidator");
const fetchAvailableSlotFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = { isBooked: 'available' };
    const { date, serviceId } = query;
    if (date) {
        queryObj.date = date;
    }
    if (serviceId) {
        queryObj.service = serviceId;
    }
    const result = yield slot_model_1.default.find(queryObj).populate('service');
    return result;
});
const fetchAllSlotFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_model_1.default.find().populate('service').sort('-createdAt');
    return result;
});
const createSlotIntoDB = (slotData) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceExists = yield service_model_1.default.findById(slotData.service);
    const existingSlots = yield slot_model_1.default.find({
        date: slotData === null || slotData === void 0 ? void 0 : slotData.date,
        service: slotData.service,
    });
    const isValidDate = (0, dateValidator_1.dateValidator)(slotData.date);
    console.log(isValidDate);
    if (!isValidDate) {
        throw new AppError_1.default(http_status_1.NOT_FOUND, 'The date is invalid. It cannot be a past date.');
    }
    if (!serviceExists) {
        throw new AppError_1.default(http_status_1.NOT_FOUND, 'Service not found.');
    }
    existingSlots.forEach((element) => {
        const existingStartTime = new Date(`1970-01-01T${element.startTime}`);
        const slotStartTime = new Date(`1970-01-01T${slotData.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${element.endTime}`);
        const slotEndTime = new Date(`1970-01-01T${slotData.endTime}`);
        if (existingStartTime < slotEndTime && existingEndTime > slotStartTime) {
            throw new AppError_1.default(http_status_1.CONFLICT, 'Slot overlaps with an existing slot.');
        }
    });
    const slotsData = [];
    const timeSlots = (0, slot_utils_1.createTimeSlots)(slotData === null || slotData === void 0 ? void 0 : slotData.startTime, slotData === null || slotData === void 0 ? void 0 : slotData.endTime, serviceExists === null || serviceExists === void 0 ? void 0 : serviceExists.duration);
    timeSlots.forEach(({ startTime, endTime }) => {
        slotsData.push(Object.assign(Object.assign({}, slotData), { startTime,
            endTime }));
    });
    const newSlots = yield slot_model_1.default.insertMany(slotsData);
    return newSlots;
});
const updateSlotIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existSlot = yield slot_model_1.default.findById(id);
    if (!existSlot) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Slot not found.');
    }
    if ((existSlot === null || existSlot === void 0 ? void 0 : existSlot.isBooked) === 'booked') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Slot update Failed.');
    }
    const result = yield slot_model_1.default.findByIdAndUpdate(id, {
        isBooked: payload.isBooked,
    }, { new: true });
    return result;
});
exports.SlotServices = {
    fetchAvailableSlotFromDB,
    fetchAllSlotFromDB,
    updateSlotIntoDB,
    createSlotIntoDB,
};

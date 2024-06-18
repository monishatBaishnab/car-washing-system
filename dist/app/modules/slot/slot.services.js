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
exports.SlotServices = void 0;
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("./slot.model"));
const slot_utils_1 = require("./slot.utils");
const fetchAvailableSlotFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return [];
});
const createSlotIntoDB = (slotData) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceExists = yield service_model_1.default.findById(slotData.service);
    if (!serviceExists) {
        throw new Error('Service not found.');
    }
    const slotsData = [];
    const timeSlots = (0, slot_utils_1.createTimeSlots)(slotData === null || slotData === void 0 ? void 0 : slotData.startTime, slotData === null || slotData === void 0 ? void 0 : slotData.endTime, serviceExists === null || serviceExists === void 0 ? void 0 : serviceExists.duration);
    timeSlots.forEach(({ startTime, endTime }) => {
        slotsData.push(Object.assign(Object.assign({}, slotData), { startTime,
            endTime }));
    });
    const newSlot = yield slot_model_1.default.insertMany(slotsData);
    return newSlot;
});
exports.SlotServices = {
    fetchAvailableSlotFromDB,
    createSlotIntoDB,
};

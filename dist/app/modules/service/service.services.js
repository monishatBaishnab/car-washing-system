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
exports.ServiceServices = void 0;
const mongoose_1 = require("mongoose");
const slot_model_1 = __importDefault(require("../slot/slot.model"));
const service_model_1 = __importDefault(require("./service.model"));
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.create(payload);
    return result;
});
const fetchAllServiceFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredQuery = Object.assign({}, query);
    const removableKeys = ['name', 'sort', 'priceRange'];
    removableKeys.forEach((key) => {
        delete filteredQuery[key];
    });
    const filterQuery = service_model_1.default.find(filteredQuery);
    let name = '';
    if (query === null || query === void 0 ? void 0 : query.name) {
        name = query === null || query === void 0 ? void 0 : query.name;
    }
    const searchQuery = filterQuery.find({
        name: { $regex: name, $options: 'i' },
    });
    const priceRange = (query === null || query === void 0 ? void 0 : query.priceRange)
        ? query.priceRange.split(',')
        : null;
    const result = yield searchQuery
        .find(Object.assign({}, (priceRange && {
        price: {
            $gte: Number(priceRange[0]),
            $lte: Number(priceRange[1]),
        },
    })))
        .sort((query === null || query === void 0 ? void 0 : query.sort) ? query === null || query === void 0 ? void 0 : query.sort : '-createdAt');
    return result;
});
const fetchSingleServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const slots = yield slot_model_1.default.find({ service: id });
    const transformedSlots = slots.reduce((acc, current) => {
        const existingEntry = acc.find((entry) => entry.date === current.date);
        const slot = {
            _id: new mongoose_1.Types.ObjectId(current._id),
            startTime: current.startTime,
            endTime: current.endTime,
            isBooked: current.isBooked,
        };
        if (existingEntry) {
            existingEntry.slots.push(slot);
        }
        else {
            acc.push({
                date: current.date,
                slots: [slot],
            });
        }
        return acc;
    }, []);
    const service = yield service_model_1.default.findById(id);
    return {
        service,
        slots: transformedSlots,
    };
});
const updatedServiceFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = service_model_1.default.findOneAndUpdate({ _id: id, isDeleted: { $ne: true } }, payload, { new: true });
    return result;
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = service_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.ServiceServices = {
    createServiceIntoDB,
    fetchAllServiceFromDB,
    fetchSingleServiceFromDB,
    updatedServiceFromDB,
    deleteServiceFromDB,
};

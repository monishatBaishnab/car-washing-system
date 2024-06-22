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
const service_model_1 = __importDefault(require("./service.model"));
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.create(payload);
    return result;
});
const fetchAllServiceFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.find();
    return result;
});
const fetchSingleServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findById(id);
    return result;
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

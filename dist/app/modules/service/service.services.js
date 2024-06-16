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
    return yield service_model_1.default.create(payload);
});
const fetchAllServiceFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_model_1.default.find();
});
const fetchSingleServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_model_1.default.findById(id);
});
const updatedServiceFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return service_model_1.default.findByIdAndUpdate(id, payload, { new: true });
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return service_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
});
exports.ServiceServices = {
    createServiceIntoDB,
    fetchAllServiceFromDB,
    fetchSingleServiceFromDB,
    updatedServiceFromDB,
    deleteServiceFromDB,
};

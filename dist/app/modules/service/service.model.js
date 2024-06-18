"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    isDeleted: { type: Boolean, required: false, default: false },
}, { timestamps: true });
serviceSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// serviceSchema.post('find', function (result) {
//     if(!result?.length){
//         // throw new Error("No matching services found.");
//         // sendResponse
//     }
// })
serviceSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
// serviceSchema.post('findOne', function (result) {
//     if(!result){
//         // throw new Error("No matching service found.");
//         // sendResponse
//     }
// })
const Service = (0, mongoose_1.model)('Service', serviceSchema);
exports.default = Service;

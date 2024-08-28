"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
    isDeleted: { type: Boolean, required: false, default: false },
}, { timestamps: true });
serviceSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
serviceSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
const Service = (0, mongoose_1.model)('Service', serviceSchema);
exports.default = Service;

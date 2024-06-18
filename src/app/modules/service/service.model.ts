import { Schema, model } from 'mongoose';
import { TService } from './service.interface';

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    isDeleted: { type: Boolean, required: false, default: false },
  },
  { timestamps: true },
);

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

const Service = model<TService>('Service', serviceSchema);

export default Service;

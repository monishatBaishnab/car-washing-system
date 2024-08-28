import { Schema, model } from 'mongoose';
import { TService } from './service.interface';

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
    isDeleted: { type: Boolean, required: false, default: false },
  },
  { timestamps: true },
);

serviceSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

const Service = model<TService>('Service', serviceSchema);

export default Service;

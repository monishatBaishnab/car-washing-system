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

serviceSchema.pre('find', function () {
    this.setQuery({ isDeleted: { $ne: true } });
})

serviceSchema.post('find', function (result) {
    if(!result?.length){
        throw new Error("No matching services found.");
    }
})

serviceSchema.pre('findOne', function () {
    this.setQuery({ isDeleted: { $ne: true } });
})

serviceSchema.post('findOne', function (result) {
    if(!result){
        throw new Error("No matching service found.");
    }
})

const Service = model<TService>('Service', serviceSchema);

export default Service;

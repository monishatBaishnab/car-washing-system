import { Types } from 'mongoose';
import { TSlot } from '../slot/slot.interface';

// type TVehicle =
//   | 'car'
//   | 'truck'
//   | 'SUV'
//   | 'van'
//   | 'motorcycle'
//   | 'bus'
//   | 'electricVehicle'
//   | 'hybridVehicle'
//   | 'bicycle'
//   | 'tractor';

export type TCustomer = {
  name: string;
  email: string;
  mobile: string;
  address: string;
};

export type TBooking = {
  customer: TCustomer;
  service: Types.ObjectId;
  slot: Types.ObjectId | TSlot;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  transactionId: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
};
export type TBookingData = {
  customer: TCustomer;
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  transactionId: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
};

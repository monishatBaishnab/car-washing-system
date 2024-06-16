import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
}, {timestamps: true});

const User = model<TUser>('user', userSchema);

export default User;

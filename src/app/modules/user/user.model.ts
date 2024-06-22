import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user: TUser = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// userSchema.post('findOne', function (doc, next) {
//     doc.password = '';
//     next();
// })

const User = model<TUser>('User', userSchema);

export default User;

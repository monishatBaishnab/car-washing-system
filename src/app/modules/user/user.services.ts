import { TUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
    const newUser = await User.create(payload);
    const findUser = User.findById(newUser._id).select('-password');
    return findUser;
}

export const userServices = {
    createUserIntoDB
}
import { TUser } from "./user.interface";

const createUserIntoDB = async (payload: TUser) => {
    return payload;
}

export const userServices = {
    createUserIntoDB
}
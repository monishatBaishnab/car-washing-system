import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/errors";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    return {
        message: 'Invalid ID',
        errorMessages: [
            {
                path: err?.path,
                message: err?.message,
            },
        ],
        statusCode: 400,
    };
}

export default handleCastError;
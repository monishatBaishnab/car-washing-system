import { BAD_REQUEST } from "http-status";
import { TErrorMessages, TGenericErrorResponse } from "../interface/errors";
import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const message = 'Validation error';
    const statusCode = BAD_REQUEST;
    const errorMessages: TErrorMessages[] = err?.issues?.map((issue: ZodIssue) => {
        return {
            path: issue?.path?.[issue?.path?.length - 1],
            message: issue?.message
        }
    })
    
    return {
        message,
        statusCode,
        errorMessages
    }
}

export default handleZodError;
import { Response } from "express";

type TResponse<T> = {
    success: boolean,
    statusCode: number,
    message: string,
    data: T
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {    
    res.status(data.statusCode).json(data);
}

export default sendResponse;

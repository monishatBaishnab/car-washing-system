export type TErrorMessages = {
  path: string | number;
  message: string;
};

export type TGenericErrorResponse = {
  message: string;
  errorMessages?: TErrorMessages[];
  statusCode: number;
};

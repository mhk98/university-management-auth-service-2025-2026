import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { IGenericErrorMessage } from "../interfaces/error";
import config from "../config";
import handleValidationError from "./handleValidationError";
import ApiError from "../errors/ApiError";
import { errorLogger } from "../shared/logger";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleCastError from "../errors/handleCastError";

const globalErrorHandler:ErrorRequestHandler = (
  error:any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

config.env === 'development' ?
console.log('globalErrorHandler ~', error) :
errorLogger.error('globalErrorHandler ~', error);

  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessage: IGenericErrorMessage[] = [];

  // ✅ Validation Error
  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
const simplifierError = handleZodError(error);
statusCode = simplifierError.statusCode;
message = simplifierError.message;
errorMessage = simplifierError.errorMessage
  } else if (error?.name === 'CastError') {
  const simplifiedError = handleCastError(error);
  statusCode = simplifiedError.statusCode;
  message = simplifiedError.message;
  errorMessage = simplifiedError.errorMessage
  }
  // ✅ Custom ApiError
  else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessage = error.message
      ? [{ path: "", message: error.message }]
      : [];
  }

  // ✅ Normal Error
  else if (error instanceof Error) {
    message = error.message;
    errorMessage = error.message
      ? [{ path: "", message: error.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";

 const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el) => {
      const error = el as mongoose.Error.ValidatorError | mongoose.Error.CastError;
      return {
        path: error.path,
        message: error.message,
      };
    }
  );
  
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessage: errors
  }
};


export default handleValidationError;
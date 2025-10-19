// import { ZodError } from "zod";
// import { IGenericErrorMessage } from "../interfaces/error";

// const handleZodError = (error: ZodError) =>{

//     // const errors

// const statusCode = 400;

// const errors: IGenericErrorMessage []= error.issues.map((issue)=> {

//     return {
//         path: issue?.path[issue.path.length-1],
//         message: issue?.message,
//     }
// });


// return {
//     statusCode,
//     message:'Validation Error',
//     errorMessage:errors
// }
// }


// export default handleZodError;


import { ZodError } from "zod";
import { IGenericErrorMessage } from "../interfaces/error";

const handleZodError = (error: ZodError) => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue) => {
    return {
      path: issue.path.length > 0 ? String(issue.path[issue.path.length - 1]) : "",
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessage: errors,
  };
};

export default handleZodError;

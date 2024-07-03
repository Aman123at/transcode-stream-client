import {  ZodError, ZodObject, ZodSchema, ZodString, z } from "zod";
type SignUpSchemaType = ZodObject<{
    email: ZodString;
    username: ZodString;
    password: ZodString;
}>;
type SignInSchemaType = ZodObject<{
    email: ZodString;
    password: ZodString;
}>;
export const signUpSchema:SignUpSchemaType = z.object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(3),
    password: z.string().min(6)
});
export const signInSchema:SignInSchemaType = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6)
});


interface ValidationResult<T> {
    success: boolean;
    error: ZodError<T> | null;
}



export const validUserInput = <T>(zodSchema: ZodSchema, userInput: T): ValidationResult<T> => {
    try {
        zodSchema.parse(userInput);
        
        return { success: true, error: null };
    } catch (error:any) {
        
        if(error instanceof ZodError){
            const extractedError = error.flatten()
            const fieldError:any = (extractedError && extractedError.hasOwnProperty("fieldErrors")) ? extractedError.fieldErrors : extractedError;
            
            return { success: false, error: fieldError  };
        }else{

            return { success: false, error }; 
        }
    }
};
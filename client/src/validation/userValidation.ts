import * as yup from "yup";


export interface UserFormValues
  extends yup.InferType<typeof userValidationSchema> {}

export const userValidationSchema = yup.object({
  login: yup.string().optional(),
});

import * as yup from "yup";

import { userRules } from "./rules";

export interface SignupFormValues
  extends yup.InferType<typeof signupValidationSchema> {}

export const signupValidationSchema = yup.object({
  login: yup.string().required(),
  password: yup
    .string()
    .min(userRules.password.min)
    .max(userRules.password.max)
    .required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords are not equal"),
});

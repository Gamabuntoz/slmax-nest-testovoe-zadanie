import * as yup from "yup";

import { roomRules } from "./rules";

export interface RoomFormValues
  extends yup.InferType<typeof roomValidationSchema> {}

export const roomValidationSchema = yup.object({
  title: yup
    .string()
    .min(roomRules.title.min)
    .max(roomRules.title.max)
    .required(),
});

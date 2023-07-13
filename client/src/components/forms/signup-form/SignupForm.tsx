import { FC } from "react";

import FormField from "../../common/form-field";
import LoadingButton from "../../common/loading-button";
import Form from "../../common/form";
import { useSignupForm } from "../../../hooks/useSignupForm";

const SignupForm: FC = () => {
  const { formMethods, onSubmit, isLoading } = useSignupForm();

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <FormField label="Login" name="login" type="text" />
      <FormField label="Password" name="password" type="password" />
      <FormField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
      />
      <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
    </Form>
  );
};

export default SignupForm;

import { FC } from "react";
import { Button } from "@mui/material";

import { useAddMessageForm } from "../../../hooks/useAddMessageForm";
import FormField from "../../common/form-field";
import classes from "./AddMessageForm.module.scss";
import Form from "../../common/form";

interface AddMessageFormProps {
  roomId: number;
}

const AddMessageForm: FC<AddMessageFormProps> = ({ roomId }) => {
  const { formMethods, onSubmit, setFile } = useAddMessageForm(roomId);

  return (
    <Form
      formMethods={formMethods}
      onSubmit={onSubmit}
      className={classes.form}
    >
      <FormField name="content" multiline />
      <Button type="submit">Send</Button>
      <input onChange={(f)=> setFile(!!f.target?.files ? f.target?.files[0] || null : null)} placeholder='upload file' type='file'/>
    </Form>
  );
};

export default AddMessageForm;

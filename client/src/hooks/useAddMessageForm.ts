import { yupResolver } from "@hookform/resolvers/yup";
import {useCallback, useState} from "react";
import { useForm } from "react-hook-form";

import { useAddMessageMutation } from "../store/api/messageApi";
import {
  MessageFormValues,
  messageValidationSchema,
} from "../validation/messageValidation";

export const useAddMessageForm = (roomId: number) => {
  const [addMessage] = useAddMessageMutation();
  const [file, setFile] = useState<File | null>(null)
  const fileType = file?.type ? file.type : null
  const formMethods = useForm<MessageFormValues>({
    mode: "onBlur",
    resolver: yupResolver(messageValidationSchema),
  });

  const addMessageHandler = useCallback(
    ({ content }: MessageFormValues) => {
      addMessage({ content, roomId, file, fileType })
    },
    [addMessage, roomId, file, fileType]
  );

  return {
    formMethods,
    onSubmit: formMethods.handleSubmit(addMessageHandler),
    file,
    setFile
  };
};

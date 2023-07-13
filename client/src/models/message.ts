import { IUser } from "./user";

export interface IMessage {
  id: number;
  userName: string
  owner: IUser;
  roomId: number;
  content: string;
  file: string | null
}

export interface AddMessageDto {
  content: string | undefined;
  roomId: number;
  file: File | null;
  fileType: string | null;
}

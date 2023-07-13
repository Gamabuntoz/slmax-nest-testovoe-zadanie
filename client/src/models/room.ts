import { IUser } from "./user";

export interface IRoom {
  id: number;
  owner: IUser;
  title: string;
  members: IUser[];
}

export interface AddRoomDto {
  title: string;
}

export interface UpdateRoomDto {
  id: number;
  title?: string;
}

export interface SearchRoomsDto {
  title?: string;
  ownerId?: number;
}

import { ComponentType } from "react";

import HomePage from "../pages/home-page";
import ProfilePage from "../pages/profile-page";
import RoomPage from "../pages/room-page";
import RoomsPage from "../pages/rooms-page";
import AddRoomPage from "../pages/add-room-page";
import UpdateRoomPage from "../pages/update-room-page";
import SigninPage from "../pages/signin-page";
import SignupPage from "../pages/signup-page";

export enum Paths {
  HOME = "/",
  SIGNUP = "/signup",
  SIGNIN = "/signin",
  PROFILE = "/profile",
  ROOMS = "/rooms",
  ROOM = "/rooms/:id",
  ADD_ROOM = "/rooms/add",
  UPDATE_ROOM = "/rooms/:id/update",
}

export interface IRoute {
  path: Paths;
  Component: ComponentType;
}

export const publicRoutes: IRoute[] = [
  { path: Paths.HOME, Component: HomePage },
  { path: Paths.SIGNUP, Component: SignupPage },
  { path: Paths.SIGNIN, Component: SigninPage },
];

export const authRoutes: IRoute[] = [
  { path: Paths.PROFILE, Component: ProfilePage },
  { path: Paths.ROOMS, Component: RoomsPage },
  { path: Paths.ROOM, Component: RoomPage },
  { path: Paths.ADD_ROOM, Component: AddRoomPage },
  { path: Paths.UPDATE_ROOM, Component: UpdateRoomPage },
];

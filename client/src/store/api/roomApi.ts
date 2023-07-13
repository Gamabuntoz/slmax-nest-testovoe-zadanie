import { baseApi, HttpMethod } from "./baseApi";
import {
  AddRoomDto,
  IRoom,
  SearchRoomsDto,
  UpdateRoomDto,
} from "../../models/room";
import { config } from "../../config";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<IRoom[], void>({
      query: () => ({ url: config.roomsUrl }),
      providesTags: ['Rooms'],
    }),
    getRoom: builder.query<IRoom, number>({
      query: (id) => ({ url: `${config.roomsUrl}/${id}` }),
      providesTags: ['Rooms'],
    }),
    searchRooms: builder.query<IRoom[], SearchRoomsDto>({
      query: (params) => ({
        url: config.searchRoomsUrl,
        method: HttpMethod.GET,
        params,
      }),
      providesTags: ['Rooms'],
    }),
    addRoom: builder.mutation<IRoom, AddRoomDto>({
      query: (body) => ({
        url: config.roomsUrl,
        method: HttpMethod.POST,
        body,
      }),
      invalidatesTags: ['Rooms'],
    }),
    updateRoom: builder.mutation<IRoom, UpdateRoomDto>({
      query: (body) => ({
        url: `${config.roomsUrl}/${body.id}`,
        method: HttpMethod.PUT,
        body,
      }),
      invalidatesTags: ['Rooms'],
    }),
    deleteRoom: builder.mutation<void, number>({
      query: (id) => ({
        url: `${config.roomsUrl}/${id}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: ['Rooms'],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
} = roomApi;

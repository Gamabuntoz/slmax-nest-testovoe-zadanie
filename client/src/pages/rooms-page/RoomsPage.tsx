import { FC } from "react";

import SearchRoomForm from "../../components/forms/search-room-form";
import RoomsList from "../../components/rooms/rooms-list";
import { useGetRoomsQuery } from "../../store/api/roomApi";
import {useAppSelector} from "../../hooks/redux";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../routes";
import {Button} from "@mui/material";

const RoomsPage: FC = () => {
  const { data } = useGetRoomsQuery();
  return (
    <div>
      <SearchRoomForm />
        <Button component={Link} to={`${Paths.ADD_ROOM}/`}>add new room</Button>
      <RoomsList rooms={data || []} />
    </div>
  );
};

export default RoomsPage;

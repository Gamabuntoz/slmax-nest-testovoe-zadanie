import { Button, Stack } from "@mui/material";
import { FC } from "react";
import {Link} from "react-router-dom";
import {Paths} from "../../../routes";

const RoomControls: FC = () => {
  return (
    <Stack direction="row">
      <Button component={Link} to={`${Paths.ROOMS}/`}>Leave</Button>
    </Stack>
  );
};

export default RoomControls;

import { FC } from "react";
import { Tab, Tabs } from "@mui/material";
import { NavLink, useLocation, useMatch } from "react-router-dom";

import { Paths } from "../../routes";

const Navbar: FC = () => {
  const { pathname } = useLocation();
  const isRoomMatch = useMatch(Paths.ROOM);

  return (
    <Tabs component="nav" value={pathname}>
      <Tab
        label="Rooms"
        value={isRoomMatch?.pathname ?? Paths.ROOMS}
        component={NavLink}
        to={Paths.ROOMS}
      />
    </Tabs>
  );
};

export default Navbar;

import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

import { Paths } from "../../routes";

import classes from "./AppTitle.module.scss";

const AppTitle: FC = () => {
  return (
    <Typography
      variant="h1"
      className={classes.title}
      component={NavLink}
      to={Paths.HOME}
    >
      slmax-nest-testovoe-zadanie
    </Typography>
  );
};

export default AppTitle;

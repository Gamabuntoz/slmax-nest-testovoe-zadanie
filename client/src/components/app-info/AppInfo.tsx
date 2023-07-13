import { FC } from "react";
import { Card, Typography } from "@mui/material";

import classes from "./AppInfo.module.scss";

const AppInfo: FC = () => {
  return (
    <Card className={classes.card}>
      <Typography variant="body1">
          Welcome to chats app, please signIn for continue
      </Typography>
    </Card>
  );
};

export default AppInfo;

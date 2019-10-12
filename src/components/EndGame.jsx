import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    background: "#4fc3f7",
    height: "100vh",
    alignItems: "center",
    flexDirection: "column"
  },
  titleText: {
    color: "#FFFFFF",
    marginTop: theme.spacing(4)
  }
}));

const EndGame = ({ history, points, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h3" className={classes.titleText}>
        The End!
      </Typography>
      <div>+ {points}</div>
    </div>
  );
};

export default withRouter(EndGame);

import React, { useState } from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

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
    marginTop: "10%"
  },
  load: {
    justifyContent: "center"
  }
}));

const WhiteCircularProgress = withStyles({
  root: {
    color: "#FFF"
  }
})(CircularProgress);

const GateSelector = ({ setGate, history, ...props }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  if (loading) {
    return (
      <div className={clsx([classes.main, classes.load])}>
        <WhiteCircularProgress />
      </div>
    );
  }
  return (
    <div className={classes.main}>
      <Typography variant="h3" className={classes.titleText}>
        Waitingroom
      </Typography>
    </div>
  );
};

export default withRouter(GateSelector);

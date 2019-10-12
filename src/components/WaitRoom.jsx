import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, LinearProgress } from "@material-ui/core";
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
  },
  progressContainer: {
    width: "100vw"
  }
}));

const WhiteCircularProgress = withStyles({
  root: {
    color: "#FFF"
  }
})(CircularProgress);

const WaitingRoom = ({ gameState, gate, history, ...props }) => {
  const classes = useStyles();

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const intId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(intId);
    };
  }, []);

  if (!gameState) {
    return (
      <div className={clsx([classes.main, classes.load])}>
        <WhiteCircularProgress />
      </div>
    );
  }

  const { endAirport, endTime, startAirport, startTime } = gameState;

  const Countdown = (...props) => {
    let remTime = 0;
    if (currentTime < startTime) {
      remTime = startTime - currentTime;
    } else if (currentTime < endTime) {
      remTime = endTime - currentTime + 5000;
    } else remTime = -1000;

    remTime = Math.floor(remTime / 1000);
    if (remTime == -1)
      return (
        <div className={classes.progressContainer}>
          <LinearProgress />
        </div>
      );
    return <Typography variant="h3">{remTime}</Typography>;
  };
  return (
    <div className={classes.main}>
      <Countdown />
      End Airport: {endAirport}
      <br />
      endTime: {endTime}
      <br />
    </div>
  );
};

export default withRouter(WaitingRoom);

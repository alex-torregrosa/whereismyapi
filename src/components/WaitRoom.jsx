import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, LinearProgress } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import ClockIcon from "@material-ui/icons/Alarm";

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    background: "#4fc3f7",
    height: "100vh",
    alignItems: "center",
    flexDirection: "column"
  },
  seconds: {
    color: "#FFFFFF"
  },
  linHolder: {
    paddingLeft: theme.spacing(2)
  },
  secondsHolder: {
    flexGrow: 1,
    textAlign: "center"
  },
  load: {
    justifyContent: "center"
  },
  timeCounter: {
    display: "flex",
    width: "100vw",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    alignItems: "center",
    background: "#0093c4"
  },
  timeIcon: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(-0.5)
  }
}));

const WhiteCircularProgress = withStyles({
  root: {
    color: "#FFF"
  }
})(CircularProgress);

const WhiteLinearProgress = withStyles({
  bar1Indeterminate: {
    backgroundColor: "#FFF"
  },
  bar2Indeterminate: {
    backgroundColor: "#FFF"
  }
})(LinearProgress);

const BigClockIcon = withStyles({
  root: {
    color: "#FFF",
    fontSize: "3rem"
  }
})(ClockIcon);

const WaitingRoom = ({ gameState, gate, history, ...props }) => {
  const classes = useStyles();

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const intId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(intId);
    };
  }, []);

  useEffect(() => {
    setWaiting(Date.now() > gameState.endTime);
  }, [gameState]);

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
    if (!waiting && remTime === -1) setWaiting(true);
    console.log("rendering");
    return (
      <Typography variant="h3" component="span" className={classes.seconds}>
        {remTime}
      </Typography>
    );
  };
  return (
    <div className={classes.main}>
      <div className={classes.timeCounter}>
        <BigClockIcon className={classes.timeIcon} />
        <div className={classes.secondsHolder}>
          {waiting ? (
            <div className={classes.linHolder}>
              <WhiteLinearProgress />
            </div>
          ) : (
            <Countdown />
          )}
        </div>
      </div>
      End Airport: {endAirport}
      <br />
      endTime: {endTime}
      <br />
    </div>
  );
};

export default withRouter(WaitingRoom);
